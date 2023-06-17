interface Props {
    showModal: boolean
}

const AddBoard = ({showModal} : Props) => {

  return 
   {showModal ? (
    <div className=''>
        <h1>Modal</h1>

    </div> ) : null}
  
}

export default AddBoard