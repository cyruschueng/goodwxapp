const fs = require('fs');
const resolve = require('path').resolve;

let r = p => resolve(__dirname, p, '../');

let jsFile = name =>  `const ${name} = {
    data:{
        
    },
    onLoad(option){

    },
    onShareAppMessage(res) {
        
    }
};
Page(${name});`;

let wxmlFile = name => `<view class='${name}'>

</view>`;

let jsonFile = name => `{
    "navigationBarTitleText": "${name}"
}`;

let wxssFile = name => `.${name}{
    background: #fff;
}`;

class WxPageGenerator{

    constructor(appJsonFile){
        this.basePath = r(appJsonFile)
    }

    async createPage(name){
        let path = this.basePath+'/pages/'+name;
        if(!fs.existsSync(path)){
            fs.mkdir(path,(err)=>{
                if(err) throw err;

                fs.writeFile(path+'/'+name+'.js', jsFile(name), e => {
                    if(e) throw e;
                });

                fs.writeFile(path+'/'+name+'.json', jsonFile(name), e => {
                    if(e) throw e;
                });

                fs.writeFile(path+'/'+name+'.wxml', wxmlFile(name), e => {
                    if(e) throw e;
                });

                fs.writeFile(path+'/'+name+'.wxss', wxssFile(name), e => {
                    if(e) throw e;
                });
            });
            this.addToAppJSON(name);
        }
    }

    addToAppJSON(name){
        let appString = fs.readFileSync(appJsonFile);
        let app = JSON.parse(appString);
        app.pages.push(`pages/${name}/${name}`);
        fs.writeFile(appJsonFile,JSON.stringify(app,null,2),e=>{
            if(e) throw e;
        })
    }
}


let appJsonFile = 'client/app.json';
let createName = process.argv.slice(2)[0];
let page = new WxPageGenerator(appJsonFile);
page.createPage(createName);

