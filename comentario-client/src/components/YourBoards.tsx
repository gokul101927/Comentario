const YourBoards = () => {
  return (
    <div className='container mx-auto p-2 pt-8 flex flex-col'>
        <div className='flex justify-between items-center'>
            <h5 className='text-black'>Your Boards</h5>
            <button className="text-sm font-small text-white rounded-md p-2 bg-primaryBlue hover:brightness-125">+ Add board</button>
        </div>
        <div className='mt-4 py-4 rounded-lg border border-2 border-dashed border-black w-full'>
            <h2 className='text-gray-500 py-12 text-center'>No boards yet.</h2>
        </div>
    </div>
  )
}

export default YourBoards