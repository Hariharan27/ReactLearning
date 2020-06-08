import React from 'react';
import Files from 'react-files';
import '../filepicker/Cutomfilepicker.css';
import attachicon from '../../assets/ic_attach.png'
import { connect } from "react-redux";
import * as FileAction from '../../redux/actions/index'
import close from '../../assets/ic_close.png';

 class Cutomfilepicker extends React.Component {

    onFilesChange = (files) => {
        var file = files[files.length-1];
        console.log(files);
        this.props.addFile({selectedtask:this.props.taskid,tfiles:file});
    }

    deletefile = (id) =>{
     this.props.removefile({fileid:id,selectedtask:this.props.taskid})
    }

    onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }

    getFileslist (files) {
        return files.map((item, index) => (
            <div className='stepholder' key={index}>
                <div className='stepname'>{item.name}</div>
                <img alt='delete' onClick={() => this.deletefile(item.id)} src={close} className='addcloseimage' />
            </div>
        ));;
    } 

    render() {

        const {files} = this.props;
        return (
            <div>
                <div className="files">
                <Files
                    className='files-dropzone'
                    onChange={this.onFilesChange}
                    onError={this.onFilesError}
                    accepts={['image/png', '.pdf', 'audio/*']}
                    multiple
                    maxFiles={10000000}
                    maxFileSize={10000000}
                    minFileSize={0}
                    clickable
                >
                    <div className='divmarginwithflexSelected'>
                        <img alt='greycircle' className='addstepimage' src={attachicon} />
                        <div className='steplablewithcolor'>Add a file</div>
                    </div>
                </Files>
            </div>

                {files != null&&files.length>0?this.getFileslist(files):null}
               
            </div>       
            
            );
    }



}

function mapDispatchToProps(dispatch) {
    return {
        addFile: file => dispatch(FileAction.AddFile(file)),
        removefile: file => dispatch(FileAction.RemoveFile(file)),

    };
}

export default connect(null, mapDispatchToProps)(Cutomfilepicker);