export default function Privacy() {
    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 flex justify-center">Privacy Policy</h1>
                <div className="bg-white shadow-md rounded-md p-6">
                    <p className="text-base text-gray-700 mb-6">Thank you for choosing Prept.ai. Your privacy is important to us. This Privacy Policy explains how we collect, use, and disclose your information when you use our services.</p>
                    <div className="mb-8">
                        <h2 className="text-lg font-bold mb-2 text-gray-800">Information Collection</h2>
                        <p className="text-base text-gray-700 mb-4">We collect information from you when you use our services. This includes:</p>
                        <ul className="list-disc list-inside text-base text-gray-700 ml-4">
                            <li>Your name, email address, and other contact information</li>
                            <li>Information about your use of our services</li>
                        </ul>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-lg font-bold mb-2 text-gray-800">Information Use</h2>
                        <p className="text-base text-gray-700 mb-4">We use the information we collect to provide and improve our services. This includes:</p>
                        <ul className="list-disc list-inside text-base text-gray-700 ml-4">
                            <li>To send you email notifications about our services</li>
                            <li>To provide customer support</li>
                        </ul>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-lg font-bold mb-2 text-gray-800">Data Retention</h2>
                        <p className="text-base text-gray-700 mb-4">We retain your personal information for as long as necessary to provide our services. This includes:</p>
                        <ul className="list-disc list-inside text-base text-gray-700 ml-4">
                            <li>To comply with our legal obligations</li>
                            <li>To comply with our contractual obligations</li>
                        </ul>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-lg font-bold mb-2 text-gray-800">Data Protection Rights</h2>
                        <p className="text-base text-gray-700 mb-4">You have certain rights with respect to your personal information. This includes:</p>
                        <ul className="list-disc list-inside text-base text-gray-700 ml-4">
                            <li>The right to access your personal information</li>
                            <li>The right to rectify your personal information</li>
                            <li>The right to erase your personal information</li>
                            <li>The right to restrict processing of your personal information</li>
                            <li>The right to data portability</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold mb-2 text-gray-800">Your Choices</h2>
                        <p className="text-base text-gray-700 mb-4">You have the following choices with respect to your personal information:</p>
                        <ul className="list-disc list-inside text-base text-gray-700 ml-4">
                            <li>To update or correct your personal information</li>
                            <li>To delete your personal information</li>
                            <li>To restrict processing of your personal information</li>
                            <li>To request access to your personal information</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
