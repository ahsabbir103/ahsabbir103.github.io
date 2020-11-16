export default class TEXT{
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
	this.ctx.fillText(this.text,this.x,this.y);
	this.ctx.fillStyle = this.font_color;
	this.ctx.font = this.font_size.toString+"px"+font_name;
}

}