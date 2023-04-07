import { useState } from 'react';
import axios from 'axios';

const Crawling_Button = () => {
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'https://api.kurly.com/goods/5138773'
            );
            setData(response.data);
        } catch (error) {
            console.error('API 호출 중 오류 발생: ', error);
        }
    };

    return (
        <div>
            <button
                onClick={fetchData}
                className="w-full h-auto bg-white mx-auto my-auto items-center rounded-md"
            >
                상품 상세정보 호출
            </button>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
};

export default Crawling_Button;
