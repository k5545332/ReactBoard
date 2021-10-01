import InputDiv from './InputDiv';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import './ckeditorstyle.css';


function InputTextArea(props) {
  let {title,id,name,value,setData,...rest} = props;
  const Token = localStorage.getItem("LoginToken");

  const handleChange = (e)=>{
    setData((preState)=>({
      ...preState,
      [name]:e,
    }));
  }

  class UploadAdapter {

    constructor(loader) {
      this.loader = loader;
    }
  
    upload() {
      return this.loader.file
        .then(file => new Promise((resolve, reject) => {
          this._initRequest();
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
        }));
    }
    // Aborts the upload process.
    abort() {
      if (this.xhr) {
        this.xhr.abort();
      }
    }
  
    _initRequest() {
      const xhr = this.xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://localhost:5001/event/add/image', true);
      xhr.responseType = 'json';
      xhr.setRequestHeader('Authorization',`Bearer ${Token}`); // set your token here
    }
  
    // Initializes XMLHttpRequest listeners.
    _initListeners(resolve, reject, file) {
      const xhr = this.xhr;
      const loader = this.loader;
      const genericErrorText = `Couldn't upload file: ${file.name}.`;
  
      xhr.addEventListener('error', () => reject(genericErrorText));
      xhr.addEventListener('abort', () => reject());
      xhr.addEventListener('load', () => {
        const response = xhr.response;
  
        if (!response || response.error) {
          return reject(response && response.error ? response.error.message : genericErrorText);
        }
  
        resolve({
          default: response.url
        });
      });
  
      if (xhr.upload) {
        xhr.upload.addEventListener('progress', evt => {
          if (evt.lengthComputable) {
            loader.uploadTotal = evt.total;
            loader.uploaded = evt.loaded;
          }
        });
      }
    }
  
    // Prepares the data and sends the request.
    _sendRequest(file) {
      // Prepare the form data.
      const data = new FormData();
  
      data.append('body', file);
      this.xhr.send(data);
    }
  
  }

  return (
    <>
      <InputDiv id={id} title={title} {...rest}>
        {/* <textarea cols="20" id={id} name={name} onChange={handleChange} value={value}></textarea> */}
        <CKEditor
          editor={ DecoupledEditor }
          onReady={ editor => {

              // Insert the toolbar before the editable area.
              editor.ui.getEditableElement().parentElement.insertBefore(
                  editor.ui.view.toolbar.element,
                  editor.ui.getEditableElement()
              );

              editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                return new UploadAdapter(loader);
              };
          } }
          onError={ ( { willEditorRestart } ) => {
              // If the editor is restarted, the toolbar element will be created once again.
              // The `onReady` callback will be called again and the new toolbar will be added.
              // This is why you need to remove the older toolbar.
              if ( willEditorRestart ) {
                  this.editor.ui.view.toolbar.element.remove();
              }
          } }
          onChange={ (event,editor) => {
            const data = editor.getData();
            handleChange(data);
          }}
          data={ value }
        />
      </InputDiv>

    </>
    
  );
}

export default InputTextArea;
