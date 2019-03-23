module.exports = {


branchFactory: function(name, parent, id=''){
    var newObject = {
        'id' : id,
        'name': name,
        'parentID': parent,
        "children" : []
    } 
    return newObject
  },
  addInTree: function(treeData, newBranch){
    for(var i = 0; i<treeData.length; i++){
      if(newBranch.parentID === treeData[i].id){
        
        var children = treeData[i].children
        for(var j = 0; j<children.length; j++){
          if(newBranch.name === children[`${j}`].name){
            return 'OAE'; //Operation already executed
          }
        }
        newBranch.id = `${newBranch.parentID}.${children.length}`
        children.push(newBranch)
        return newBranch.id
      }else{
        
        if(newBranch.parentID.startsWith(treeData[i].id)){
          return this.addInTree(treeData[i].children, newBranch)
        }
      }
    }
  },
  seachInTree: function(treeData, branchId){
    for(var i = 0; i<treeData.length; i++){
      if(branchId == treeData[i].id){
        return treeData[i]
        
      }else{
        if(branchId.startsWith(treeData[i].id)){
           return this.seachInTree(treeData[i].children, branchId)
        }
      }
    }
  }

}