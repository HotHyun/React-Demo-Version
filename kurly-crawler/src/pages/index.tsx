import Crawling_Button from '@/components/crawling-button';

const HomePage = () => {
    return (
        <div className="w-auto h-auto border-2 border-gray-800 shadow-lg bg-black">
            <p className="text-lg text-white text-center">Crawled Data</p>
            <Crawling_Button></Crawling_Button>
        </div>
    );
};

export default HomePage;
