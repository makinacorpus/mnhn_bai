var sum = new Array();
var view = 'sag';
var obj_offcn = document.createElement('canvas');
var obj_offtx = obj_offcn.getContext('2d');
var canvas = '';
var context = '';
var flatObj_px;
var flatObj_W,flatObj_H;
var flatObj_Wdim,flatObj_Hdim;
var max = 0;
var flatObj_dim = new Array(3); // [LR,PA,IS]=[180,216,180];
var flatObj_pixdim = new Array(3);
var flatObj_datatype;
var slice = 50;
var flatObj = 0;
var flatObj_min, flatObj_max;
var name;

function init_stereotaxic(theName, progress)
{
    canvas = document.getElementById('objCanvas');
    context = canvas.getContext('2d');

    name = theName;
    loadFlatObj(progress);
}

function changeView(theView)
{
    switch(theView)
    {
        case 'sagittal':
            view='sag';
            break;
        case 'coronal':
            view='cor';
            break;
        case 'axial':
            view='axi';
            break;
    }
    if(flatObj)
        configureFlatObjImage();
    drawImages();
}
function changeSlice(e,u)
{
    slice=$("#slider").slider("value");
    drawImages();
}

function configureFlatObjImage()
{
    // init query image
    switch(view)
    {
        case 'sag':     flatObj_W=flatObj_dim[1]/*PA*/; flatObj_H=flatObj_dim[2]/*IS*/; flatObj_Wdim=flatObj_pixdim[1]; flatObj_Hdim=flatObj_pixdim[2]; break; // sagital
        case 'cor':     flatObj_W=flatObj_dim[0]/*LR*/; flatObj_H=flatObj_dim[2]/*IS*/; flatObj_Wdim=flatObj_pixdim[0]; flatObj_Hdim=flatObj_pixdim[2]; break; // coronal
        case 'axi':     flatObj_W=flatObj_dim[0]/*LR*/; flatObj_H=flatObj_dim[1]/*PA*/; flatObj_Wdim=flatObj_pixdim[0]; flatObj_Hdim=flatObj_pixdim[1]; break; // axial
    }
    obj_offcn.width=flatObj_W;
    obj_offcn.height=flatObj_H;
    canvas.width=flatObj_W;
    canvas.height=flatObj_H;
    flatObj_px=obj_offtx.getImageData(0,0,obj_offcn.width,obj_offcn.height);

    var W=parseFloat($('#resizable').css('width'));
    $('#resizable').css('height', (flatObj_H*flatObj_Hdim)*W/(flatObj_W*flatObj_Wdim) );
}
function drawImages()
{
    context.clearRect(0,0,context.canvas.width,canvas.height);
    
    // draw flatObj
    if(flatObj)
        drawFlatObjImage();
    else
    {
        var img = new Image();
        img.src = "data/"+name+"/"+view+".jpg";
        img.onload = function(){
            var W=parseFloat($('#resizable').css('width'));
            var     w=this.width;
            var     h=this.height;
            console.log("W:",W,"w:",w,"h:",h);
            $('#resizable').css('height', h*W/w );
            canvas.width=W;
            canvas.height=h*W/w;
            context.drawImage(this,0,0,W,h*W/w);
        };
    }
}
function drawFlatObjImage()
{
    if(flatObj == 0)
        return;

    ys = Math.floor(flatObj_dim[0]/*LR*/*slice/100);
    yc = Math.floor(flatObj_dim[1]/*PA*/*slice/100);
    ya = Math.floor(flatObj_dim[2]/*IS*/*slice/100);
    for(y = 0; y < flatObj_H; y++)
    for(x = 0; x < flatObj_W; x++)
    {
        switch(view)
        {
            case 'sag':i= y*flatObj_dim[1]/*PA*/*flatObj_dim[0]/*LR*/+ x*flatObj_dim[0]/*LR*/+ys; break;
            case 'cor':i= y*flatObj_dim[1]/*PA*/*flatObj_dim[0]/*LR*/+yc*flatObj_dim[0]/*LR*/+x; break;
            case 'axi':i=ya*flatObj_dim[1]/*PA*/*flatObj_dim[0]/*LR*/+ y*flatObj_dim[0]/*LR*/+x; break;
        }
        val=255*(flatObj[i]-flatObj_min)/(flatObj_max-flatObj_min);
//              i=((flatObj_H-y-1)*obj_offcn.width+x)*4;
        i=(y*obj_offcn.width+x)*4;
        flatObj_px.data[ i ]  =val;
        flatObj_px.data[ i+1 ]=val;
        flatObj_px.data[ i+2 ]=val;
        flatObj_px.data[ i+3 ]=255;
    }
    obj_offtx.putImageData(flatObj_px, 0, 0);

    context.drawImage(obj_offcn,0,0,flatObj_W,flatObj_H);
}


function loadFlatObj(progress)
{
        var oReq = new XMLHttpRequest();
        //oReq.open("GET", "data/"+name+"/MRI-n4.nii.gz", true);
        oReq.open("GET", "/data/MRI-n4.nii.gz", true);
        oReq.addEventListener("progress", function(e){progress.html("Loading MRI ("+parseInt(100*e.loaded/e.total)+"%)")}, false);
        //progress.html("<span id='loader'><div class='dot'></div></span> Loading MRI "+parseInt(100*e.loaded/e.total)+"%");
        oReq.responseType = "arraybuffer";
        oReq.onload = function(oEvent)
        {
            var prog=new Object();
            prog.drawProgress=function(pct){progress.html("Uncompressing MRI ("+parseInt(100*pct)+"%)")};
            var gunzip = new Gunzip(prog);
            gunzip.gunzip(this.response,function(data){
                //vol.finishedDecompress(vol, data);
                var dv = new DataView(data);//this.response);
                var sizeof_hdr = dv.getInt32(0,true);
                var dimensions = dv.getInt16(40,true);
                flatObj_dim[0] = dv.getInt16(42,true);
                flatObj_dim[1] = dv.getInt16(44,true);
                flatObj_dim[2] = dv.getInt16(46,true);
                flatObj_datatype = dv.getInt16(72,true);
                flatObj_pixdim[0] = dv.getFloat32(80,true);
                flatObj_pixdim[1] = dv.getFloat32(84,true);
                flatObj_pixdim[2] = dv.getFloat32(88,true);
                var vox_offset = dv.getFloat32(108,true);
        
                switch(flatObj_datatype)
                {
                    case 8:
                        flatObj=new Uint8Array(data,vox_offset);
                        break;
                    case 16:
                        flatObj=new Int16Array(data,vox_offset);
                        break;
                    case 32:
                        flatObj=new Float32Array(data,vox_offset);
                        break;
                }
        
                var s,ss,std,tmpmin,tmpmax;
                s=ss=0;
                flatObj_min=flatObj_max=flatObj[0];
                for(i=0;i<flatObj.length;i++)
                {
                        if(flatObj[i]<flatObj_min)
                                flatObj_min=flatObj[i];
                        if(flatObj[i]>flatObj_max)
                                flatObj_max=flatObj[i];
                        s+=flatObj[i];
                        ss+=flatObj[i]*flatObj[i];
                }
                s=s/flatObj.length;
                std=Math.sqrt(ss/flatObj.length-s*s);
                tmpmin=s-2*std;
                tmpmax=s+2*std;
                flatObj_min=(tmpmin<flatObj_min)?flatObj_min:tmpmin;
                flatObj_max=(tmpmax>flatObj_max)?flatObj_max:tmpmax;
        
                console.log("dim",flatObj_dim[0],flatObj_dim[1],flatObj_dim[2]);
                console.log("datatype",flatObj_datatype);
                console.log("pixdim",flatObj_pixdim[0],flatObj_pixdim[1],flatObj_pixdim[2]);
                console.log("vox_offset",vox_offset);
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
                configureFlatObjImage();
                //progress.html("<a class='download' href='/data/"+name+"/MRI-n4.nii.gz'><img src='download.svg' style='vertical-align:middle;margin-bottom:5px'/></a>MRI");
                //progress.html("<a class='download' href='/data/"+name+"/MRI-n4.nii.gz'><img src='' style='vertical-align:middle;margin-bottom:5px'/></a>");
                progress.html("");
                drawImages();
        });

        //if (gunzip.hasError()) {

        };
        oReq.send();

        console.log("[loadFlatObj] flatObj started loading");
        drawImages();
}