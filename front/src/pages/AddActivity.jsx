import { useState } from "react";

export default function AddActivity({ user, onAdd }) {
    const [type, setType] = useState("RUNNING");
    const [duration, setDuration] = useState(30);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ userId: user.id, activityType: type, duration });
    };

    const activityIcons = {
        RUNNING: "🏃‍♂️",
        WALKING: "🚶‍♂️",
        CYCLING: "🚴‍♂️",
        SWIMMING: "🏊‍♂️",
        YOGA: "🧘‍♂️",
        CARDIO: "💓",
        DANCING: "💃",
        HIKING: "🥾",
        STRETCHING: "🤸‍♂️"
    };

    return (
        <div className="max-w-md mx-auto bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <span className="text-2xl">➕</span>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Add New Activity
                </h2>
                <p className="text-gray-500 text-sm mt-1">Track your fitness journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Activity Type
                    </label>
                    <div className="relative">
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white shadow-sm hover:shadow-md"
                        >
                            {[
                                "RUNNING",
                                "WALKING",
                                "CYCLING",
                                "SWIMMING",
                                "YOGA",
                                "CARDIO",
                                "DANCING",
                                "HIKING",
                                "STRETCHING",
                            ].map((t) => (
                                <option key={t} value={t}>
                                    {activityIcons[t]} {t.charAt(0) + t.slice(1).toLowerCase()}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Duration (minutes)
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            min="1"
                            max="1440"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                            placeholder="Enter duration..."
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <span className="text-gray-400 text-sm">min</span>
                        </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Quick set:</span>
                        <div className="space-x-2">
                            {[15, 30, 45, 60].map((time) => (
                                <button
                                    key={time}
                                    type="button"
                                    onClick={() => setDuration(time)}
                                    className={`px-2 py-1 rounded-lg transition-all duration-200 ${
                                        duration === time
                                            ? 'bg-blue-500 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {time}min
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                >
                    <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save Activity
                    </span>
                </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">💡</span>
                        </div>
                    </div>
                    <p className="ml-3 text-sm text-blue-700">
                        <span className="font-semibold">Tip:</span> Regular activity tracking helps maintain consistency in your fitness goals!
                    </p>
                </div>
            </div>
        </div>
    );
}