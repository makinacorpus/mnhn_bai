/*
 * Original: Roberto Toro
 * Adaptation: Sylvain Beorchia
 * Version: 1.0.0.0  Oct 2014
 */

function Stereotaxic() {

//     this.sum = new Array();
    this.view = 'sag';
    this.obj_offcn = document.createElement('canvas');
    this.obj_offtx = this.obj_offcn.getContext('2d');
    this.canvas = '';
    this.context = '';
    this.flatObj_px;
    this.flatObj_W;
    this.flatObj_H;
    this.flatObj_Wdim;
    this.flatObj_Hdim;
//     this.max = 0;
    this.flatObj_dim = new Array(3); // [LR,PA,IS]=[180,216,180];
    this.flatObj_pixdim = new Array(3);
    this.flatObj_datatype;
    this.slice = 50;
    this.flatObj = 0;
    this.flatObj_min;
    this.flatObj_max;
    this.name;

    /*
     * init_stereotaxic
     * 
     */
    this.init = function (name, progress) {
        this.canvas = document.getElementById('objCanvas');
        this.context = this.canvas.getContext('2d');
        this.name = name;
        this.loadFlatObj(progress);
    };

    /*
     * changeView
     * 
     */
    this.changeView = function (pView) {
        switch(pView)
        {
            case 'sagittal':
                this.view = 'sag';
                break;
            case 'coronal':
                this.view = 'cor';
                break;
            case 'axial':
                this.view = 'axi';
                break;
        }
        if(this.flatObj)
            this.configureFlatObjImage();
        this.drawImages();
    };

    /*
     * changeSlice
     * 
     */
    this.changeSlice = function (e,u) {
        stereotaxic.slice = $("#slider").slider("value");
        stereotaxic.drawImages();
    };

    /*
     * configureFlatObjImage
     * 
     */
    this.configureFlatObjImage = function() {
        // init query image
        switch(this.view)
        {
            case 'sag': this.flatObj_W=this.flatObj_dim[1]/*PA*/; this.flatObj_H=this.flatObj_dim[2]/*IS*/; this.flatObj_Wdim=this.flatObj_pixdim[1]; this.flatObj_Hdim=this.flatObj_pixdim[2]; break; // sagital
            case 'cor': this.flatObj_W=this.flatObj_dim[0]/*LR*/; this.flatObj_H=this.flatObj_dim[2]/*IS*/; this.flatObj_Wdim=this.flatObj_pixdim[0]; this.flatObj_Hdim=this.flatObj_pixdim[2]; break; // coronal
            case 'axi': this.flatObj_W=this.flatObj_dim[0]/*LR*/; this.flatObj_H=this.flatObj_dim[1]/*PA*/; this.flatObj_Wdim=this.flatObj_pixdim[0]; this.flatObj_Hdim=this.flatObj_pixdim[1]; break; // axial
        }
        this.obj_offcn.width = this.flatObj_W;
        this.obj_offcn.height = this.flatObj_H;
        this.canvas.width = this.flatObj_W;
        this.canvas.height = this.flatObj_H;
        this.flatObj_px = this.obj_offtx.getImageData(0, 0, this.obj_offcn.width, this.obj_offcn.height);

        var W = parseFloat($('#resizable').css('width'));
        $('#resizable').css('height', (this.flatObj_H*this.flatObj_Hdim)*W/(this.flatObj_W*this.flatObj_Wdim) );
    };

    /*
     * drawImages
     * 
     */
    this.drawImages = function() {
        this.context.clearRect(0,0,this.context.canvas.width,this.canvas.height);
        
        // draw flatObj
        if(this.flatObj)
            this.drawFlatObjImage();
        else
        {
            var img = new Image();
            img.src = "data/" + this.name + "/" + this.view + ".jpg";
            img.onload = function() {
                var W = parseFloat($('#resizable').css('width'));
                var w = this.width;
                var h = this.height;
                console.log("W:",W,"w:",w,"h:",h);
                $('#resizable').css('height', h*W/w );
                this.canvas.width = W;
                this.canvas.height = h*W/w;
                this.context.drawImage(this, 0, 0, W, h*W/w);
            };
        }
    };

    /*
     * drawFlatObjImage
     * 
     */
    this.drawFlatObjImage = function() {
        if(this.flatObj == 0)
            return;

        ys = Math.floor(this.flatObj_dim[0]/*LR*/*this.slice/100);
        yc = Math.floor(this.flatObj_dim[1]/*PA*/*this.slice/100);
        ya = Math.floor(this.flatObj_dim[2]/*IS*/*this.slice/100);
        for(y = 0; y < this.flatObj_H; y++)
        for(x = 0; x < this.flatObj_W; x++)
        {
            switch(this.view)
            {
                case 'sag': i = y*this.flatObj_dim[1]/*PA*/*this.flatObj_dim[0]/*LR*/+ x*this.flatObj_dim[0]/*LR*/+ys; break;
                case 'cor': i = y*this.flatObj_dim[1]/*PA*/*this.flatObj_dim[0]/*LR*/+yc*this.flatObj_dim[0]/*LR*/+x; break;
                case 'axi': i =ya*this.flatObj_dim[1]/*PA*/*this.flatObj_dim[0]/*LR*/+ y*this.flatObj_dim[0]/*LR*/+x; break;
            }
            val = 255*(this.flatObj[i]-this.flatObj_min)/(this.flatObj_max-this.flatObj_min);
            i = (y*this.obj_offcn.width+x)*4;
            this.flatObj_px.data[ i ] = val;
            this.flatObj_px.data[ i+1 ] = val;
            this.flatObj_px.data[ i+2 ] = val;
            this.flatObj_px.data[ i+3 ] = 255;
        }
        this.obj_offtx.putImageData(this.flatObj_px, 0, 0);

        this.context.drawImage(this.obj_offcn,0,0,this.flatObj_W,this.flatObj_H);
    };

    /*
     * loadFlatObj
     * 
     */
    this.loadFlatObj = function(progress) {
        
/*        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(e) {
                    if (e.lengthComputable) {
                        progress.html("Loading MRI ("+parseInt(100*e.loaded/e.total)+"%)")
                    }
                }, false);

                xhr.addEventListener("progress", function(e) {
                    if (evt.lengthComputable)e {
                        var percentComplete = e.loaded / e.total;
                        //Do something with download progress
                    }
                }, false);

                return xhr;
            },
            type: 'POST',
            url: "/",
            data: {},
            success: function(data){
                //Do something on success
            }
        });       */ 
        ///////////////////////////////////////////////////////////////////////////
        var oReq = new XMLHttpRequest();
        //oReq.open("GET", "data/"+name+"/MRI-n4.nii.gz", true);
        oReq.open("GET", "/data/"+this.name, true);
        oReq.addEventListener("progress", function(e){ 
                                    progress.html("Loading MRI ("+parseInt(100*e.loaded/e.total)+"%)") 
                                }, false);
        oReq.responseType = "arraybuffer";
        oReq.onload = function(oEvent)
        {
            var prog = new Object();
            prog.drawProgress = function(pct){ 
                progress.html("Uncompressing MRI ("+parseInt(100*pct)+"%)") 
            };
            var gunzip = new Gunzip(prog);
            gunzip.gunzip(this.response, function(data) {
                var dv = new DataView(data);
                var sizeof_hdr = dv.getInt32(0,true);
                var dimensions = dv.getInt16(40,true);
                stereotaxic.flatObj_dim[0] = dv.getInt16(42,true);
                stereotaxic.flatObj_dim[1] = dv.getInt16(44,true);
                stereotaxic.flatObj_dim[2] = dv.getInt16(46,true);
                stereotaxic.flatObj_datatype = dv.getInt16(72,true);
                stereotaxic.flatObj_pixdim[0] = dv.getFloat32(80,true);
                stereotaxic.flatObj_pixdim[1] = dv.getFloat32(84,true);
                stereotaxic.flatObj_pixdim[2] = dv.getFloat32(88,true);
                var vox_offset = dv.getFloat32(108,true);
        
                switch(stereotaxic.flatObj_datatype)
                {
                    case 8:
                        stereotaxic.flatObj = new Uint8Array(data, vox_offset);
                        break;
                    case 16:
                        stereotaxic.flatObj = new Int16Array(data, vox_offset);
                        break;
                    case 32:
                        stereotaxic.flatObj = new Float32Array(data, vox_offset);
                        stereotaxic;
                }
        
                var s, ss, std, tmpmin, tmpmax;
                s = ss = 0;
                stereotaxic.flatObj_min = stereotaxic.flatObj_max = stereotaxic.flatObj[0];
                for(i = 0; i < stereotaxic.flatObj.length; i++)
                {
                        if(stereotaxic.flatObj[i] < stereotaxic.flatObj_min)
                                stereotaxic.flatObj_min = stereotaxic.flatObj[i];
                        if(stereotaxic.flatObj[i] > stereotaxic.flatObj_max)
                                stereotaxic.flatObj_max = stereotaxic.flatObj[i];
                        s += stereotaxic.flatObj[i];
                        ss += stereotaxic.flatObj[i]*stereotaxic.flatObj[i];
                }
                s = s/stereotaxic.flatObj.length;
                std = Math.sqrt(ss/stereotaxic.flatObj.length-s*s);
                tmpmin = s-2*std;
                tmpmax = s+2*std;
                stereotaxic.flatObj_min = (tmpmin<stereotaxic.flatObj_min)?stereotaxic.flatObj_min:tmpmin;
                stereotaxic.flatObj_max = (tmpmax>stereotaxic.flatObj_max)?stereotaxic.flatObj_max:tmpmax;
        
                console.log("dim", stereotaxic.flatObj_dim[0], stereotaxic.flatObj_dim[1], stereotaxic.flatObj_dim[2]);
                console.log("datatype", stereotaxic.flatObj_datatype);
                console.log("pixdim", stereotaxic.flatObj_pixdim[0], stereotaxic.flatObj_pixdim[1], stereotaxic.flatObj_pixdim[2]);
                console.log("vox_offset", vox_offset);
                /*
                            0              int   sizeof_hdr;    //!< MUST be 348           //  // int sizeof_hdr;      //
                            4              char  data_type[10]; //!< ++UNUSED++            //  // char data_type[10];  //
                            14             char  db_name[18];   //!< ++UNUSED++            //  // char db_name[18];    //
                            32             int   extents;       //!< ++UNUSED++            //  // int extents;         //
                            36             short session_error; //!< ++UNUSED++            //  // short session_error; //
                            38             char  regular;       //!< ++UNUSED++            //  // char regular;        //
                            39             char  dim_info;      //!< MRI slice ordering.   //  // char hkey_un0;       //

                                                                                                    //--- was image_dimension substruct ---//
                            40             short dim[8];        //!< Data array dimensions.//  // short dim[8];        //
                            56             float intent_p1 ;    //!< 1st intent parameter. //  // short unused8;       //
                                                                                                                                    // short unused9;       //
                            60             float intent_p2 ;    //!< 2nd intent parameter. //  // short unused10;      //
                                                                                                                                    // short unused11;      //
                            64             float intent_p3 ;    //!< 3rd intent parameter. //  // short unused12;      //
                                                                                                                                    // short unused13;      //
                            68             short intent_code ;  //!< NIFTI_INTENT_* code.  //  // short unused14;      //
                            72             short datatype;      //!< Defines data type!    //  // short datatype;      //
                            74             short bitpix;        //!< Number bits/voxel.    //  // short bitpix;        //
                            76             short slice_start;   //!< First slice index.    //  // short dim_un0;       //
                            78             float pixdim[8];     //!< Grid spacings.        //  // float pixdim[8];     //
                            110    float vox_offset;    //!< Offset into .nii file //  // float vox_offset;    //
                            float scl_slope ;    //!< Data scaling: slope.  //  // float funused1;      //
                            float scl_inter ;    //!< Data scaling: offset. //  // float funused2;      //
                            short slice_end;     //!< Last slice index.     //  // float funused3;      //
                            char  slice_code ;   //!< Slice timing order.   //
                            char  xyzt_units ;   //!< Units of pixdim[1..4] //
                            float cal_max;       //!< Max display intensity //  // float cal_max;       //
                            float cal_min;       //!< Min display intensity //  // float cal_min;       //
                            float slice_duration;//!< Time for 1 slice.     //  // float compressed;    //
                            float toffset;       //!< Time axis shift.      //  // float verified;      //
                            int   glmax;         //!< ++UNUSED++            //  // int glmax;           //
                            int   glmin;         //!< ++UNUSED++            //  // int glmin;           //
                */
                stereotaxic.configureFlatObjImage();
                //progress.html("<a class='download' href='/data/"+stereotaxic.name+"/MRI-n4.nii.gz'><img src='download.svg' style='vertical-align:middle;margin-bottom:5px'/></a>MRI");
                //progress.html("<a class='download' href='/data/"+stereotaxic.name+"/MRI-n4.nii.gz'><img src='' style='vertical-align:middle;margin-bottom:5px'/></a>");
                progress.html("");
                stereotaxic.drawImages();
        });

        //if (gunzip.hasError()) {

        };
        oReq.send();
        console.log("[loadFlatObj] flatObj started loading");
        this.drawImages();
    };
}

stereotaxic = new Stereotaxic();