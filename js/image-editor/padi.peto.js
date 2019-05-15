toRad = function(degree){
	return degree * Math.PI / 180;
}
sinResult = function(degree){
	return Math.sin(toRad(degree));
}
cosResult = function(degree){
	return Math.cos(toRad(degree));
}
makeline = function(x1,y1,radius,angle){
	x2 = radius*cosResult(angle)+x1;
	y2 = radius*sinResult(angle)+y1;
	context.moveTo(x1,y1);
	context.lineTo(x2,y2);
	context.stroke();
	return {
		outx:x2,outy:y2
	}
}
makecurve = function(startX,startY,mousepos,ocolor){
	context.beginPath();
	var width = mousepos.x - startX, height = mousepos.y - startY;
	context.moveTo(startX,startY);
	context.quadraticCurveTo(startX,startY+height,startX+width,startY+height);
	context.strokeStyle = ocolor;
	context.stroke();
	return {
		outx:mousepos.x,outy:mousepos.y
	}
}
makecountercurve = function(startX,startY,mousepos,ocolor){
	context.beginPath();
	var width = mousepos.x - startX, height = mousepos.y - startY;
	context.moveTo(startX,startY);
	context.quadraticCurveTo(startX+width,startY,startX+width,startY+height);
	context.strokeStyle = ocolor;
	context.stroke();
	return {
		outx:mousepos.x,outy:mousepos.y
	}
}
makecurvewitharrow = function(startX,startY,mousepos,ocolor){
	endpoint = makecurve(startX,startY,mousepos,ocolor);
	radius = getRadius(startX,startY,endpoint.outx,endpoint.outy);
	angle = getDegree(startX,startY,endpoint.outx,endpoint.outy);
	if(endpoint.outx-40>startX){
		line2 = makeline(endpoint.outx,endpoint.outy,20,180+20);
		line2 = makeline(endpoint.outx,endpoint.outy,20,180-20);
	}
	if(endpoint.outx+40<startX){
		line2 = makeline(endpoint.outx,endpoint.outy,20,-20);
		line2 = makeline(endpoint.outx,endpoint.outy,20,+20);
	}
}
makecountercurvewitharrow = function(startX,startY,mousepos,ocolor){
	endpoint = makecountercurve(startX,startY,mousepos,ocolor);
	radius = getRadius(startX,startY,endpoint.outx,endpoint.outy);
	angle = getDegree(startX,startY,endpoint.outx,endpoint.outy);
	if(endpoint.outy-40>startY){
		line = makeline(endpoint.outx,endpoint.outy,20,250);
		line2 = makeline(endpoint.outx,endpoint.outy,20,290);
	}
	if(endpoint.outy+40<startY){
		line2 = makeline(endpoint.outx,endpoint.outy,20,+70);
		line2 = makeline(endpoint.outx,endpoint.outy,20,+110);
	}
}
makeroundedcorner = function(startX,startY,endX,endY,ocolor){
	context.beginPath();
	var width = endX - startX, height = endY - startY;
	context.moveTo(startX,startY);
	context.quadraticCurveTo(startX,startY+height,startX+width,startY+height);
	context.strokeStyle = ocolor;
	context.stroke();
	return {
		outx:endX,outy:endY
	}
}
makelinewitharrow = function(x1,y1,radius,angle,arrowangle){
	line1 = makeline(x1,y1,radius,angle);
	line2 = makeline(line1.outx,line1.outy,20,180+angle-arrowangle);
	line3 = makeline(line1.outx,line1.outy,20,180+angle+arrowangle);
}
getMousePos = function(canvas,evt){
	var rect = canvas.getBoundingClientRect();
	return {
		x:evt.clientX-rect.left,
		y:evt.clientY-rect.top
	};
};
clearRect = function(){
	context.clearRect(0,0,canvas.width,canvas.height);
	loadImage();
}
drawCircle = function(mousepos,ocolor){
	context.beginPath();
	xx = Math.pow((mousepos.x - startX),2);
	yy = Math.pow((mousepos.y - startY),2);
	radius = Math.sqrt(xx+yy);
	context.arc(startX, startY, radius,0,2*Math.PI,false);
	context.lineWidth=4;
	context.strokeStyle = ocolor;
	context.stroke();
}
drawLine = function(startX,startY,mousepos,ocolor,linewidth){
	context.setLineDash([]);
	context.beginPath();
	context.moveTo(startX,startY);
	context.lineTo(mousepos.x,mousepos.y);
	context.strokeStyle=ocolor;
	context.lineWidth = linewidth;
	context.stroke();
}
drawFreeLine = function(mousepos,ocolor){
	context.lineTo(mousepos.x,mousepos.y);
	context.strokeStyle=ocolor;
	context.lineWidth = 4;
	context.stroke();
}
drawRectangle = function(mousepos,ocolor){
	context.beginPath();
	context.rect(startX,startY,mousepos.x - startX,mousepos.y - startY);
	context.lineWidth = 4;
	context.strokeStyle = ocolor;
	context.stroke();
}
drawObject = function(mousepos,ocolor,src,width,height){
	context.beginPath();
	startX = mousepos.x;
	startY = mousepos.y;
	context.moveTo(mousepos.x+width,mousepos.y+height);
	var stamp = new Image();
	stamp.src = src;
	context.strokeStyle = ocolor;
	context.drawImage(stamp,startX,startY,width,height);
}
drawStamp = function(mousepos,ocolor,stamp){
	context.beginPath();
	context.moveTo(startX,startY);
	img = new Image();
	img.src = stamp;
	context.strokeStyle = ocolor;
	var stampwidth = 90,stampheight=102;
	switch (scale){
		case 1:
		stampwidth = 180;stampheight = 102;
		break;
		case 2:
		stampwidth = 300;stampheight = 170;
		break;
		case 3:
		stampwidth = 600;stampheight = 340;
		break;			
	}
	inspectFlip(mousepos,stampwidth,stampheight, result => {
		console.log("Result",result);
		context.drawImage(img,result.startX,result.startY,stampwidth,stampheight);
	})
}
inspectFlip = function(mousepos,stampwidth,stampheight,callback){
	console.log("mousepos",mousepos);
	if ($("#fliphor").is(":checked")){
		startX = mousepos.x+(stampwidth/2);
		startY = mousepos.y-(stampheight/2);
		context.scale(-1,1);
		_startX = -1*startX
		_startY = startY;

	}else{
		startX = mousepos.x-(stampwidth/2);
		startY = mousepos.y-(stampheight/2);		
		context.scale(1,1);
		_startX = startX;
		_startY = startY;
	}
	callback({startX:_startX,startY:_startY});
}
drawUploaded = function(mousepos,ocolor,stamp){
	context.beginPath();
	startX = mousepos.x-200;
	startY = mousepos.y-200;
	context.moveTo(startX,startY);
	img = new Image();
	img.src = stamp;
	context.strokeStyle = ocolor;
	context.drawImage(img,startX,startY);
}
drawText = function(startX,startY,mousepos,ocolor){
	context.putImageData(imageData, 0, 0);
	context.save();
	th = mousepos.x - startX;
	tv = mousepos.y - startY;
	radian = Math.atan2(tv , th);
	context.translate(startX,startY);
	context.rotate(radian);
	switch(scale){
		case 1:
		context.font = "16px serif";
		break;
		case 2:
		context.font = "32px serif";
		break;
		case 3:
		context.font = "72px serif";
		break;
	}
	
	context.fillStyle = ocolor;
	context.textAlign = "left";
	context.fillText($("#textToWrite").val(),0,0);
	context.restore();
}
getRadius = function(startX,startY,endX,endY){
	th = endX - startX;
	tv = endY - startY;
	out = Math.sqrt(Math.pow(th,2)+Math.pow(tv,2));
	return out;
}
getDegree = function(startX,startY,endX,endY){
	radian = Math.atan2(endY-startY,endX-startX);
	out = radian * (180 / Math.PI);
	return out;
}
drawArrow = function(startx,starty,endx,endy,arrowangle,ocolor){
	console.log("Arrow","StarX",startx,"StartY",starty,"EndX",endx,"EndY",endy);
	context.strokeStyle=ocolor;
	angle = getDegree(startx,starty,endx,endy);
	radius = getRadius(startx,starty,endx,endy);
	line1 = makeline(startx,starty,radius,angle);
	line2 = makeline(line1.outx,line1.outy,20,180+angle-arrowangle);
	line3 = makeline(line1.outx,line1.outy,20,180+angle+arrowangle);
}
drawRoundedRectangle = function(mousepos,ocolor){
	context.beginPath();
	margin =20;
	angle = getDegree(startX,startY,mousepos.x,mousepos.y);
	console.log('main color',ocolor);
	context.fillStyle = ocolor;
	if (angle>0 && angle <=90){
		makeroundedcorner(mousepos.x,mousepos.y-margin,mousepos.x-margin,mousepos.y,ocolor);
		makeroundedcorner(startX,startY+margin,startX+margin,startY,ocolor);
		makeroundedcorner(startX,mousepos.y-margin,startX+margin,mousepos.y,ocolor);
		makeroundedcorner(mousepos.x,startY+margin,mousepos.x-margin,startY,ocolor);
		context.moveTo(startX,startY+margin);
		context.lineTo(startX,mousepos.y-margin);
		context.stroke();
		context.moveTo(startX+margin,startY);
		context.lineTo(mousepos.x-margin,startY);
		context.stroke();
		context.moveTo(startX+margin,mousepos.y);
		context.lineTo(mousepos.x-margin,mousepos.y);
		context.stroke();
		context.moveTo(mousepos.x,startY+margin);
		context.lineTo(mousepos.x,mousepos.y-margin);
		context.stroke();
		console.log('1st color',ocolor);
	}
	if (angle<0 && angle >-90){
		makeroundedcorner(startX,startY-margin,startX+margin,startY,ocolor);
		makeroundedcorner(startX,mousepos.y+margin,startX+margin,mousepos.y,ocolor);
		makeroundedcorner(mousepos.x,startY-margin,mousepos.x-margin,startY,ocolor);
		makeroundedcorner(mousepos.x,mousepos.y+margin,mousepos.x-margin,mousepos.y,ocolor);
		context.moveTo(startX,startY-margin);
		context.lineTo(startX,mousepos.y+margin);
		context.stroke();
		context.moveTo(startX+margin,startY);
		context.lineTo(mousepos.x-margin,startY);
		context.stroke();
		context.moveTo(startX+margin,mousepos.y);
		context.lineTo(mousepos.x-margin,mousepos.y);
		context.stroke();
		context.moveTo(mousepos.x,startY-margin);
		context.lineTo(mousepos.x,mousepos.y+margin);
		context.stroke();
		console.log('2nd color',ocolor);
	}
	if (angle>-180 && angle <-90){
		makeroundedcorner(startX+margin,startY-margin,startX,startY,ocolor);
		makeroundedcorner(startX+margin,mousepos.y+margin,startX,mousepos.y,ocolor);
		makeroundedcorner(mousepos.x,startY-margin,mousepos.x+margin,startY,ocolor);
		makeroundedcorner(mousepos.x,mousepos.y+margin,mousepos.x+margin,mousepos.y,ocolor);
		context.moveTo(startX+margin,startY-margin);
		context.lineTo(startX+margin,mousepos.y+margin);
		context.stroke();
		context.moveTo(startX,startY);
		context.lineTo(mousepos.x+margin,startY);
		context.stroke();
		context.moveTo(startX,mousepos.y);
		context.lineTo(mousepos.x+margin,mousepos.y);
		context.stroke();
		context.moveTo(mousepos.x,startY-margin);
		context.lineTo(mousepos.x,mousepos.y+margin);
		context.stroke();
		console.log('3rd color',ocolor);
	}
	if (angle>90 && angle <180){
		makeroundedcorner(startX,startY+margin,startX-margin,startY,ocolor);
		makeroundedcorner(startX,mousepos.y-margin,startX-margin,mousepos.y,ocolor);
		makeroundedcorner(mousepos.x,startY+margin,mousepos.x+margin,startY,ocolor);
		makeroundedcorner(mousepos.x,mousepos.y-margin,mousepos.x+margin,mousepos.y,ocolor);
		context.moveTo(startX,startY+margin);
		context.lineTo(startX,mousepos.y-margin);
		context.stroke();
		context.moveTo(startX-margin,startY);
		context.lineTo(mousepos.x+margin,startY);
		context.stroke();
		context.moveTo(startX-margin,mousepos.y);
		context.lineTo(mousepos.x+margin,mousepos.y);
		context.stroke();
		context.moveTo(mousepos.x,startY+margin);
		context.lineTo(mousepos.x,mousepos.y-margin);
		context.stroke();
		console.log('4th color',ocolor);
	}
}
makepath = function(startX,startY,mousepos,ocolor){
	context.beginPath();
	context.moveTo(startX,startY);
	context.lineTo(mousepos.x,mousepos.y);
	context.strokeStyle=ocolor;
	context.setLineDash([5,15]);
	context.stroke();
}
download = function(link,canvas,filename){
	link.href = canvas.toDataURL();
	link.download = filename;
}
loadImage = function(){
	imageObj.onload = function(){
		context.drawImage(imageObj,0,0);
	}
}
var imageObj = new Image(),
	canvas = document.getElementById("mycanvas"),
	context = canvas.getContext('2d'),
	mycursor="arrow",
	mycolor="#000000",
	buttonPushed = false,
	curPosX= 0,
	curPosY= 0,
	startX = 0,
	startY = 0,
	size = 'small',
	scale = 1,
	width = 40, height = 70,
	imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
