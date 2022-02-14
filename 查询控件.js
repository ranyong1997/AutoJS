let debugWidget = function( widget, flag ){
    flag = flag != null ? flag : 0
    if( widget ){
        let prefix = ""
        for (let idx = 0; idx < flag; idx++) {            
            prefix = prefix + "  "
        }
        log( "  " + prefix + flag + " " + widget.bounds() + " " + widget.id() + " " + widget.className() + " - " + widget.text() + " - " + widget.desc() + " - " + widget.checked() + " - " + widget.selected() + " - " + widget.clickable() + " - " + widget.visibleToUser() )
        if(widget.childCount()){
            log(  prefix + "  " +  " \\" + widget.childCount()  )
            widget.children().forEach(child => {
                debugWidget( child, flag+1 )
            });
        }
    }
}

debugWidget( classNameStartsWith("android").findOne(1000) )