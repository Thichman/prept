const Card = ({ svg, text, pencilIcon, onEdit }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-row items-center text-black">
            <div className="mr-4 rounded-full bg-gray-200 p-2">
                {svg}
            </div>
            <div className="flex-1">
                {text}
            </div>
            {pencilIcon && (
                <div className="ml-4 rounded-full bg-gray-200 p-2 cursor-pointer" onClick={onEdit}>
                    {pencilIcon}
                </div>
            )}
        </div>
    );
};

export default Card;
