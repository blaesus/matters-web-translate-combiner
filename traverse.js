const fs = require('fs');

const glob = require('glob')
const parseString = require('xml2js').parseString;


const translateRegex = /<Translate(.|\n)*?\/>/

function clean(s) {
    return s.replace(/{/g, "").replace(/}/g, "").replace(/`/g, "'")
}

glob("../aliorum/matters-web/**/*.tsx", {}, function (er, files) {
    console.info(files)

    for (const path of files) {
        const source = fs.readFileSync(path).toString();
        const match = translateRegex.exec(source);
        if (match) {
            const tag = clean(match[0])
            // console.info(tag);
            parseString(tag, function (err, result) {
                try {
                    const attributes = result.Translate['$'];
                    if (attributes.zh_hant) {
                        console.info([attributes.zh_hant, attributes.zh_hans, attributes.en].join(","))
                    }
                } catch {
                    // console.info("error")
                }
            });
        }
    }
})
