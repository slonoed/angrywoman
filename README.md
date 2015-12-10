# Angrywoman
JS lib for angryman

## Install
```
npm install --save angrywoman
```

## Usage
```
var Angrywoman = require('angrywoman')
var angrywoman = new Angrywoman({
  url: 'http://angryman-server.com/',
  project: 'my-project'
}); 

try {
  window.undefinedMethod()  
}
catch (e) {
  angrywoman.shout(e, 'My catch label');  
  // or
  angrywoman.shout(e, {
    label: 'My catch label',
    anyMetaKey: 'My metainfo'  
  );  
}
```
