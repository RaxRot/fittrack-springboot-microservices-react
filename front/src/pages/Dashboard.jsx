import { useEffect } from "react";

export default function Dashboard({ user, activities, loadActivities }) {
    useEffect(() => {
        loadActivities();
    }, []);

    const activityColors = {
        RUNNING: "from-orange-500 to-red-500",
        WALKING: "from-green-500 to-emerald-500",
        CYCLING: "from-blue-500 to-cyan-500",
        SWIMMING: "from-cyan-500 to-blue-600",
        YOGA: "from-purple-500 to-pink-500",
        CARDIO: "from-red-500 to-pink-500",
        DANCING: "from-pink-500 to-rose-500",
        HIKING: "from-amber-600 to-orange-500",
        STRETCHING: "from-indigo-500 to-purple-500"
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

    const totalStats = activities.reduce((acc, activity) => ({
        totalDuration: acc.totalDuration + activity.duration,
        totalCalories: acc.totalCalories + activity.caloriesBurned,
        totalActivities: acc.totalActivities + 1
    }), { totalDuration: 0, totalCalories: 0, totalActivities: 0 });

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            Welcome back, {user.firstName || user.email}! 👋
                        </h1>
                        <p className="text-gray-500 mt-2">Here's your fitness overview</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-xl">🔥</span>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-blue-600 mb-1">Total Activities</p>
                                <p className="text-2xl font-bold text-gray-800">{totalStats.totalActivities}</p>
                            </div>
                            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                                <span className="text-white">📊</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-green-600 mb-1">Total Minutes</p>
                                <p className="text-2xl font-bold text-gray-800">{totalStats.totalDuration}</p>
                            </div>
                            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                                <span className="text-white">⏱️</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-orange-600 mb-1">Calories Burned</p>
                                <p className="text-2xl font-bold text-gray-800">{totalStats.totalCalories}</p>
                            </div>
                            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                                <span className="text-white">🔥</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Activities Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Your Activities</h2>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                        {activities.length} activities
                    </span>
                </div>

                {activities.length > 0 ? (
                    <div className="space-y-4">
                        {activities.map((activity) => (
                            <div
                                key={activity.id}
                                className="group p-5 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${activityColors[activity.type]} flex items-center justify-center shadow-md`}>
                                            <span className="text-lg">{activityIcons[activity.type]}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 text-lg">
                                                {activity.type.charAt(0) + activity.type.slice(1).toLowerCase()}
                                            </h3>
                                            <div className="flex items-center space-x-4 mt-1">
                                                <span className="flex items-center text-sm text-gray-600">
                                                    <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {activity.duration} min
                                                </span>
                                                <span className="flex items-center text-sm text-gray-600">
                                                    <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                                                    </svg>
                                                    {activity.caloriesBurned} cal
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">📝</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">No activities yet</h3>
                        <p className="text-gray-500 max-w-sm mx-auto">
                            Start your fitness journey by adding your first activity!
                        </p>
                    </div>
                )}
            </div>

            {/* Motivation Quote */}
            {activities.length > 0 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">💪</span>
                            </div>
                        </div>
                        <p className="ml-3 text-sm text-purple-700">
                            <span className="font-semibold">Great work!</span> You're {totalStats.totalCalories > 500 ? "crushing" : "starting"} your fitness goals!
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}