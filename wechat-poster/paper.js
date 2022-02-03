class Paper {
  constructor(ctx) {
    this.ctx = ctx;
  }

  drawText(ops) {
    const { ctx } = this;
    const {
      text,
      x,
      y,
      fillStyle,
      fontFamily,
      fontSize,
      fontWeight,
      textAlign,
      textBaseline,
    } = ops;
    ctx.save();
    if (textAlign) {
      ctx.textAlign = textAlign;
    }

    if (textBaseline) {
      ctx.textBaseline = textBaseline;
    }

    if (fillStyle) {
      ctx.fillStyle = fillStyle;
    }
    if (fontWeight || fontSize || fontFamily) {
      ctx.font = `${fontWeight} ${fontSize}  ${fontFamily}`;
    }
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  drawImage(ops) {
    const { ctx } = this;
    // ctx.save();
    const { width, height, x, y,url } = ops;
    let img = document.createElement("img");
    img.setAttribute("crossOrigin", "anonymous");
    img.src = url;
    return new Promise((resolve) => {
      img.onload = () => {
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(img, x, y, width, height);
        // ctx.restore();
        resolve();
      };
      img.onerror = (err)=>{
        // ctx.restore();
        reject(err);
      }
    });
  }

  drawRect(ops){
    const { ctx } = this;
    const {
        x,
        y,
        width,
        height,
        fillStyle,
    } = ops;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x+width, y);
    ctx.lineTo(x+width, y+height);
    ctx.lineTo(x, y+height);
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.restore();
  }

drawRRect(ops){
    const { ctx } = this;
    const {
        x,
        y,
        width,
        height,
        fillStyle,
        radius = height/2
    } = ops;
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    const tl = [x,y];
    const tr = [x+width,y];
    const bl = [x,y+height];
    const br = [x+width,y+height]
    ctx.moveTo(tl[0]+radius,tl[1]);
    ctx.lineTo(tr[0]-radius,tr[1]);
    ctx.arcTo(...tr,tr[0],tr[1]+radius,radius);
    ctx.lineTo(br[0],br[1]-radius);
    ctx.arcTo(...br,br[0]-radius,br[1],radius);
    ctx.lineTo(bl[0]+radius,bl[1]);
    ctx.arcTo(...bl,bl[0],bl[1]-radius,radius);
    ctx.lineTo(tl[0],tl[1]+radius);
    ctx.arcTo(...tl,tl[0]+radius,tl[1],radius);
    ctx.closePath()
    ctx.fill();
    ctx.restore();
  }

  calcTextWidth(ops){
    const { ctx } = this;
    const {
      text,
      fontFamily,
      fontSize,
      fontWeight,
    } = ops;
    ctx.save();
    if (fontWeight || fontSize || fontFamily) {
      ctx.font = `${fontWeight} ${fontSize}  ${fontFamily}`;
    }
    const width = ~~(ctx.measureText(text).width*100)/100;
    console.log()
    ctx.restore();
    return width;
  }
}
