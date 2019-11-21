const read = "../../localdata/alternatelogosTMP/"
// const filename="pelicans.png"
const write = "../public/images/alternatelogos/"
const fs = require('fs')
const sharp = require('sharp');

const HEIGHT_VALUE = 100;

fs.readdirSync(read).forEach(filename => {
	fs.readFile(read + filename, function(err, content) {
	  	if(err) {
	  		onError(err);
	  		return;
		}

		
		const image = sharp(content)

		image.metadata()
	  	.then(function(metadata) {
	  		console.log(metadata)
			let width=metadata.width;
			let height=metadata.height;

			let newWidth=Math.round((width*HEIGHT_VALUE)/height);
			
	  		return image
	    	.resize(newWidth, HEIGHT_VALUE)
	    	// .png()
	    	.toFile(write+filename, function(err){
	            if(err){
	                return;
	            }
	            console.log("saved")
	        });
	    })
	});

});