import { Music } from 'lucide-react';

const MusicPanel = () => {
    return (
        <div className="bg-surface rounded-2xl p-6 border border-primary/20 w-1/4">
            <div className="flex gap-2 text-center">
                <Music className="text-accent text-center" size={36}/>
                <h1 className="text-2xl">Music Panel</h1>
            </div>
            <p>Coming Soon</p>
        </div>
    )
};

export default MusicPanel;