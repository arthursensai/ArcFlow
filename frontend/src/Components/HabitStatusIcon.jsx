import { X, Clock, CheckCircle, XCircle  } from 'lucide-react';

const HabitStatusIcon = ({ status }) => {
    const iconClasses = "w-5 h-5";
    const icons = {
        pending: <Clock className={`text-yellow-400 ${iconClasses}`} />,
        completed: <CheckCircle className={`text-green-500 ${iconClasses}`} />,
        missed: <XCircle className={`text-red-500 ${iconClasses}`} />,
    };

    return icons[status] || null;
};

export default HabitStatusIcon;