import http from 'http';
import fs from 'fs';
import readline from 'readline';

const TMP_HTML_FILE = 'html.tmp';

//const url = 'http://iteslj.org/questions/';
const url = 'http://localhost/a.html';

async function downloadAndSaveHtml() {
    return new Promise((resolve)=>{
        let file = fs.createWriteStream(TMP_HTML_FILE);
        http.get(url, (response)=>{
            response.pipe(file);
            resolve();
        });
    });
}

async function parseHtmlFile() {
    let data = [];
    return new Promise((resolve)=>{
        let lineReader = readline.createInterface({
            input: fs.createReadStream(TMP_HTML_FILE),
        });

        let re = /<a href=['"]([\w.]*)['"]>([ :&;.?,'/\-\w]+)<\/a>/g;
        lineReader.on('line', (line)=>{
            for (;;) {
                let m = re.exec(line);
                if (m === null) {
                    break;
                }
                let link = m[1];
                let title = m[2].replace(/&amp;/g, '&');
                data.push({link, title});
            }        
        });
        lineReader.on('close', ()=>{
            resolve(data);
        });
    });
}

function createDataJson(data) {
    let json = '[\n' +
               data.map((d)=>`{"link":"${d.link}","title":"${d.title}"}`).join(',\n') +
               '\n]\n';
    return json;
}

async function main() {
    await downloadAndSaveHtml();
    let data = await parseHtmlFile();
    let json = createDataJson(data);
    let stream = fs.createWriteStream('public/data.json');
    stream.write(json);
    stream.end();
    fs.unlinkSync(TMP_HTML_FILE);
}

main();

