(function($){
    canvas.addEventListener('mousedown',function(evt){
        $("#btnUndo").attr("disabled",false);
		var mousepos = getMousePos(canvas,evt),ocolor = '#'+$('.color').val();
		buttonPushed = true;
		imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
		context.beginPath();
		startX = mousepos.x;
		startY = mousepos.y;
		switch(mycursor){
			case "line":
				context.moveTo(mousepos.x,mousepos.y);
			break;
			case "curve":
				context.moveTo(mousepos.x,mousepos.y);
			break;
			case "countercurve":
				context.moveTo(mousepos.x,mousepos.y);
			break;
			case "curveWithArrow":
				context.moveTo(mousepos.x,mousepos.y);
			break;
			case "counterCurveWithArrow":
				context.moveTo(mousepos.x,mousepos.y);
			break;
			case "arrow":
				context.moveTo(mousepos.x,mousepos.y);
			break;
			case "text":
				context.moveTo(mousepos.x,mousepos.y);
			break;
			case "freedrag":
				context.moveTo(mousepos.x,mousepos.y);
			break;
			case "circle":
				context.moveTo(mousepos.x,mousepos.y);
			break;
			case "roundedrectangle":
				context.moveTo(mousepos.x,mousepos.y);
			break;
			case "rectangle":
				context.moveTo(mousepos.x,mousepos.y);
			break;
			case "uploadimage":
				drawUploaded(mousepos,ocolor,imgsrc);
			break;
			case "tower1":
				drawObject(mousepos,ocolor,'img/stamps/RadioTower.png',40*scale,70*scale);
			break;
			case "tower2":
				drawObject(mousepos,'img/stamps/antenna.png',40*scale,70*scale);
			break;
			case "palm1":
				drawObject(mousepos,ocolor,'img/stamps/palm1.png',40*scale,70*scale);
				break;
			case "palm2":
				drawObject(mousepos,ocolor,'img/stamps/palm.png',40*scale,70*scale);
				break;
			case "forest":
				drawObject(mousepos,ocolor,'img/stamps/forest.png',40*scale,70*scale);
				break;
			case "sharkright":
				drawObject(mousepos,ocolor,'img/stamps/whitehiungakakright.png',80*scale,110*scale);
				break;
			case "sharkleft":
				drawObject(mousepos,ocolor,'img/stamps/whitehiungakak.png',80*scale,110*scale);
				break;
			case "smilingLaptop":
				drawObject(mousepos,ocolor,'img/stamps/smilingLaptop.png',100*scale,100*scale);
				break;
			case "stampApproved":
				drawStamp(mousepos,ocolor,completed);
				break;		
			case "whitesedan":
				drawObject(mousepos,ocolor,'img/stamps/whitesedan.png',100*scale,100*scale);
				break;
			case "whitesedanr":
				drawObject(mousepos,ocolor,'img/stamps/whitesedanr.png',100*scale,100*scale);
				break;
			case "callout1":
				drawStamp(mousepos,ocolor,callout1);
				break;
			case "callout2":
				drawStamp(mousepos,ocolor,callout2);
				break;
			case "thinking1":
				drawStamp(mousepos,ocolor,thinking1);
				break;
			case "shout1":
				drawStamp(mousepos,ocolor,shout1);
				break;
        }
        disableScroll();
	});
	canvas.addEventListener('mousemove',function(evt){
		var mousepos = getMousePos(canvas,evt),ocolor = '#'+$(".color").val();
		if(buttonPushed){
			clearRect();
			context.putImageData(imageData, 0, 0);
			switch(mycursor){
				case "uploadimage":
					drawUploaded(mousepos,ocolor,imgsrc);
				break;
				case "circle":
					context.setLineDash([]);
					context.lineWidth = 4;
					drawCircle(mousepos,'grey');
				break;
				case "curve":
					makecurve(startX,startY,mousepos);
				break;
				case "countercurve":
					makecountercurve(startX,startY,mousepos);
				break;
				case "curveWithArrow":
					makecurvewitharrow(startX,startY,mousepos);
				break;
				case "counterCurveWithArrow":
					makecountercurvewitharrow(startX,startY,mousepos);
				break;
				case "rectangle":
					drawRectangle(mousepos,'grey');
				break;
				case "roundedrectangle":
					drawRoundedRectangle(mousepos,'grey');
				break;
				case 'freedrag':
					drawFreeLine(mousepos,'grey');
				break;
				case 'line':
					drawLine(startX,startY,mousepos,'grey',4);
				break;
				case 'arrow':
					context.setLineDash([5,15]);
					drawLine(startX,startY,mousepos,'grey',4);
				break;
				case 'text':
					makepath(startX,startY,mousepos,'grey');
				break;
				case 'tower1':
					drawObject(mousepos,ocolor,'img/stamps/RadioTower.png',40*scale,70*scale);
				break;
				case 'tower2':
					drawObject(mousepos,ocolor,'img/stamps/antenna.png',40*scale,70*scale);
				break;
				case "sharkright":
					drawObject(mousepos,ocolor,'img/stamps/whitehiungakakright.png',80*scale,110*scale);
					break;
				case "sharkleft":
					drawObject(mousepos,ocolor,'img/stamps/whitehiungakak.png',80*scale,110*scale);
					break;
				case "palm1":
					drawObject(mousepos,ocolor,'img/stamps/palm1.png',40*scale,70*scale);
					break;
				case "palm2":
					drawObject(mousepos,ocolor,'img/stamps/palm.png',40*scale,70*scale);
					break;
				case "forest":
					drawObject(mousepos,ocolor,'img/stamps/forest.png',40*scale,70*scale);
					break;
				case "smilingLaptop":
					drawObject(mousepos,ocolor,'img/stamps/smilingLaptop.png',100*scale,100*scale);
					break;
				case "whitesedan":
					drawObject(mousepos,ocolor,'img/stamps/whitesedan.png',100*scale,100*scale);
					break;
				case "whitesedanr":
					drawObject(mousepos,ocolor,'img/stamps/whitesedanr.png',100*scale,100*scale);
					break;
				case "callout1":
					drawStamp(mousepos,ocolor,callout1);
					break;
				case "callout2":
					drawStamp(mousepos,ocolor,callout2);
					break;
				case "thinking1":
					drawStamp(mousepos,ocolor,thinking1);
					break;
				case "shout1":
					drawStamp(mousepos,ocolor,shout1);
					break;
			}
		}
	});

    canvas.addEventListener('mouseup',function(evt){
        var mousepos = getMousePos(canvas,evt),ocolor = '#'+$(".color").val();
        context.lineWidth = 4;
        buttonPushed = false;
        context.setLineDash([]);
        console.log('Mycursor',mycursor);
        switch(mycursor){
            case "uploadimage":
                drawUploaded(mousepos,ocolor,imgsrc);
            break;
            case "freedrag":
                drawFreeLine(mousepos,ocolor);
                break;
            case "circle":
                drawCircle(mousepos,ocolor);
                break;
            case "curve":
                c = makecurve(startX,startY,mousepos,ocolor);
                break;
            case "countercurve":
                c = makecountercurve(startX,startY,mousepos,ocolor);
                break;
            case "curveWithArrow":
                c = makecurvewitharrow(startX,startY,mousepos,ocolor);
                break;
            case "counterCurveWithArrow":
                c = makecountercurvewitharrow(startX,startY,mousepos,ocolor);
                break;
            case "rectangle":
                drawRectangle(mousepos,ocolor);
                break;
            case "roundedrectangle":
                drawRoundedRectangle(mousepos,ocolor);
                break;
            case "arrow":
                drawArrow(startX,startY,mousepos.x,mousepos.y,20,ocolor);
                break;
            case "line":
                drawLine(startX,startY,mousepos,ocolor,4);
                break;
            case "text":
                drawText(startX,startY,mousepos,ocolor);
                break;
            case "tower1":
            console.log('scale',scale);
                drawObject(mousepos,ocolor,'img/stamps/RadioTower.png',40*scale,70*scale);
                break;
            case "tower2":
                drawObject(mousepos,ocolor,'img/stamps/antenna.png',40*scale,70*scale);
                break;
            case "palm1":
                drawObject(mousepos,ocolor,'img/stamps/palm1.png',40*scale,70*scale);
                break;
            case "palm2":
                drawObject(mousepos,ocolor,'img/stamps/palm.png',40*scale,70*scale);
                break;
            case "forest":
                drawObject(mousepos,ocolor,'img/stamps/forest.png',40*scale,70*scale);
                break;
            case "stampApproved":
                drawStamp(mousepos,ocolor,completed);
                break;
            case "sharkright":
                drawObject(mousepos,ocolor,'img/stamps/whitehiungakakright.png',80*scale,110*scale);
                break;
            case "sharkleft":
                drawObject(mousepos,ocolor,'img/stamps/whitehiungakak.png',80*scale,110*scale);
                break;
            case "smilingLaptop":
                drawObject(mousepos,ocolor,'img/stamps/smilingLaptop.png',100*scale,100*scale);
                break;
            case "whitesedan":
                drawObject(mousepos,ocolor,'img/stamps/whitesedan.png',100*scale,100*scale);
                break;
            case "whitesedanr":
                drawObject(mousepos,ocolor,'img/stamps/whitesedanr.png',100*scale,100*scale);
                break;
            case "callout1":
                drawStamp(mousepos,ocolor,callout1);
                break;
            case "callout2":
                drawStamp(mousepos,ocolor,callout2);
                break;
            case "thinking1":
                drawStamp(mousepos,ocolor,thinking1);
                break;
            case "shout1":
                drawStamp(mousepos,ocolor,shout1);
                break;
        }
        enableScroll();
    });
    $("#btnClear").click(function(){
        context.clearRect(0,0,canvas.width,canvas.height);
        loadImage();
    });
    $("#btnUndo").click(function(){
        //clearRect();
        console.log("btn undo invoked");
        context.clearRect(0,0,canvas.width,canvas.height);
        context.putImageData(imageData, 0, 0);
        $(this).attr('disabled',true)
    });
    $("#btnSave").click(function(){
        download(this,canvas,'petosyarif.png');
    });
    $("#btnArrow").click(function(){
        mycursor = "arrow";
    });
    $("#btnLine").click(function(){
        mycursor = "line";
    });
    $("#btnCurve").click(function(){
        mycursor = "curve";
    });
    $("#btnCounterCurve").click(function(){
        mycursor = "countercurve";
    });
    $("#btnCurveWithArrow").click(function(){
        mycursor = "curveWithArrow";
    });
    $("#btnCounterCurveWithArrow").click(function(){
        mycursor = "counterCurveWithArrow";
    });
    $("#btnCircle").click(function(){
        mycursor = "circle";
    });
    $("#btnRectangle").click(function(){
        mycursor = "rectangle";
    });
    $("#btnRoundedRectangle").click(function(){
        mycursor = "roundedrectangle";
    });
    $("#btnFreeDrag").click(function(){
        mycursor = "freedrag";
    });
    $("#btnTower1").click(function(){
        mycursor = "tower1";
    });
    $("#btnTower2").click(function(){
        mycursor = "tower2";
    });
    $("#btnPalm1").click(function(){
        mycursor = "palm1";
    });
    $("#btnPalm2").click(function(){
        mycursor = "palm2";
    });
    $("#btnForest").click(function(){
        mycursor = "forest";
    });
    $("#btnSharkRight").click(function(){
        mycursor = "sharkright";
    });
    $("#btnSharkLeft").click(function(){
        mycursor = "sharkleft";
    });
    $("#btnSmilingLaptop").click(function(){
        mycursor = "smilingLaptop";
    });
    $("#whitesedan").click(function(){
        mycursor = "whitesedan";
    });
    $("#whitesedanr").click(function(){
        mycursor = "whitesedanr";
    });
    $("#btnStampApproved").click(function(){
        mycursor = "stampApproved";
    });
    $("#btnCallout1").click(function(){
        mycursor = "callout1";
    });
    $("#btnCallout2").click(function(){
        mycursor = "callout2";
    });
    $("#btnThinking1").click(function(){
        mycursor = "thinking1";
    });
    $("#btnShout1").click(function(){
        mycursor = "shout1";
    });
    $("#btnText").click(function(){
        $('#dText').modal();
        mycursor = "text";
    });
    $('#saveText').click(function(){
        $('#dText').modal('hide');
    });
    $("#btnDownload").click(function(){
        download(this,canvas,$('#picName').val());
    /*		var dataUrl = canvas.toDataURL();
        var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        window.location.href=image;*/
    });
    $("#btnLoadImageFitWidth").change(function(evt){
        var input = evt.target,
            filereader = new FileReader();
        filereader.onloadend = function(){
            console.log('filereaderresult',filereader.result);
            resizeImage2(filereader.result,canvas.width,result => {
                imgsrc = result
            })
        }
        filereader.readAsDataURL(input.files[0]);
    });
    $("#btnLoadImage").change(function(evt){
        var input = evt.target,
            filereader = new FileReader();
        filereader.onloadend = function(){
            console.log('filereaderresult',filereader.result);
            imgsrc = filereader.result;
        }
        filereader.readAsDataURL(input.files[0]);
    });
    $("#btnLoadImage").hide();
    $("#btnuploader").click(function(){
        mycursor = "uploadimage";
        $("#btnLoadImage").click();
    });
    $("#btnuploaderfitwidth").click(function(){
        mycursor = "uploadimage";
        $("#btnLoadImageFitWidth").click();
    });
    
    $('.stampsize').click(function(){
        console.log('stampsize',$(this).attr('value'));
        switch($(this).attr('value')){
            case 'small':
                scale = 1;
                break;
            case 'medium':
                scale = 2;
                break;
            case 'big':
                scale = 3;
                break;
        }
    });
    /*canvas.addEventListener("touchstart", function(e){
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
    
        e.preventDefault();//Stops the default behavior
    }, false);
    
    canvas.addEventListener("touchend", function(e){
        endX = e.touches[0].pageX;
        endY = e.touches[0].pageY;
    
        e.preventDefault();//Stops the default behavior
    }, false);
    */
    disableScroll = function(){
        $("#page-top").css('overflow','hidden');
    }
    enableScroll = function(){
        $("#page-top").css('overflow','auto');
        $("#page-top").css('overflow-x','visible');
    }
}(jQuery))
