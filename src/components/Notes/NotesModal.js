import React,{useRef,useState} from 'react'
import Card from '../UI/Card'
import classes from './NotesModal.module.css'
import { uiActions } from '../../store/ui-slice.js'
import { useDispatch } from 'react-redux'
import {useSelector} from 'react-redux';

const isEmpty=value=>value.trim()==='';
export default function NotesModal() {
  const id_= useSelector(state=>state.ui.showNoteWithId);
  const items=useSelector(state=>state.notes.items);

  const [formInputsValidity, setFormInputsValidity] = useState(true);

  const titleInputRef=useRef();
  const taglineInputRef=useRef();
  const contentInputRef=useRef();

  const dispatch=useDispatch();

 
  const existingItem = items.find((item) => item.id === id_);
  console.log(
    id_,existingItem,items.length
  )
  const onCancelHandler=(e)=>{
    e.preventDefault();
    console.log('normal');
    dispatch(uiActions.toggleNoteModal());
    
  }
  
  
  const onSubmitHandler=(e)=>{
    e.preventDefault();
    const enteredTitle=titleInputRef.current.value;
    const enteredTagline=taglineInputRef.current.value;
    const enteredContent=contentInputRef.current.value;

    const enteredTitleIsValid=!isEmpty(enteredTitle);
    setFormInputsValidity(enteredTitleIsValid);
    if(enteredTitleIsValid===false)return;
    
  }
  return (
    <form className={classes.backdrop}>
      <Card className={classes.card}>
        <div className={classes.forms}>
          <input className={classes.title} type='text' placeholder='Title' maxLength="50" ref={titleInputRef} value={existingItem.title}/>
          <p className={!formInputsValidity?classes.error:classes.noerror}>*title is required</p>
          <input className={classes.tagline} type='text' placeholder='Tagline'maxLength="50" ref={taglineInputRef} value={existingItem.tagline}/>
          <textarea className={classes.content} type='text' placeholder='Your content goes here...' maxLength="350" ref={contentInputRef} value={existingItem.content}/>
          
          <div className={classes.buttons}>
            <button onClick={onCancelHandler} className={classes.cancel}>Cancel</button>
            <button onClick={onSubmitHandler} className={classes.save}>Save</button>
          </div>
        </div>
      </Card>
    </form>
  )
}
