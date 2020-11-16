class TEXT{
	constructor(canvas_object,x,y,text,font_name,font_size,font_color){
		this.ctx = canvas_object;
		this.x = x;
		this.y = y;
		this.text = text;
		this.font_name = font_name;
		this.font_size = font_size;
		this.font_color = font_color;
	};

setText(){
	// this.ctx.beginPath();
	this.ctx.fillText(this.text,this.x,this.y);
	this.ctx.fillStyle = this.font_color;
	this.ctx.font = this.font_size.toString+"px"+this.font_name;
	// this.ctx.closePath();
}

}


welcome_text = " COMMING SOON !"




let canvas = document.createElement("canvas");
document.body.appendChild(canvas);
let ctx = canvas.getContext("2d");


// canvas.shadowBlur = 20;
// canvas.shadowColor = "black";
// canvas.fillStyle = "red";
// canvas.fillRect(20, 20, 100, 80);




const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;


// default text folor filled
ctx.fillStyle = "#f00";
//   canvas_object,x,y,text,font_name,font_size,font_color
let text = new TEXT(ctx,20,50, welcome_text,"Arial",30,"#5b5b5b").setText();

let text1 = new TEXT(ctx,20,55, welcome_text,30,"#5b5b5b").setText();

