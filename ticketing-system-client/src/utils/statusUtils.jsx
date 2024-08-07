// statusUtils.js
export const statusOptions = [
    { value: 'open', label: 'Open', icon: '🟢' },
    { value: 'in_progress', label: 'In Progress', icon: '🔧' },
    { value: 'closed', label: 'Closed', icon: '❌' },
];

export const getStatusIcon = (status) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option ? option.icon : '';
};

export const getStatusLabel = (status) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option ? `${option.label} ${option.icon}` : '';
};