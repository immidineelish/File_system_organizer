let fs = require("fs");
let path = require("path");

function viewFn(src, mode) {
    

    if (mode == "flat")
        viewHelperFlat(src);
    else 
        viewHelperTree(src, "|");
}

function checkFileOrFolder(path) {
    let isFile = fs.lstatSync(path).isFile();
    return isFile;
}


function viewHelperFlat(src) {
    
    let isFile = checkFileOrFolder(src);
    if (isFile == true) {  
        console.log(src, "*");
    } else { 
        console.log(src);
        let childrens = fs.readdirSync(src); 
        
        for (let i = 0;i < childrens.length;i++) {
            let child = childrens[i]; 
            let childPath = path.join(src, child);
            
            viewHelperFlat(childPath);
            
        }
    }
}


function viewHelperTree(src, indent) {
    
    let isFile = checkFileOrFolder(src);
    if (isFile == true) {  
        console.log(indent, path.basename(src), "*");  
    } else { 
        console.log(indent, path.basename(src));
        let childrens = fs.readdirSync(src); 
        
        for (let i = 0;i < childrens.length;i++) {
            let child = childrens[i]; 
            let childPath = path.join(src, child);
            
            viewHelperTree(childPath, indent+"____");
            
        }
    }
}

module.exports = {
    view: viewFn
}