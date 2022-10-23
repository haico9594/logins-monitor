export default function formatDate(date) {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}