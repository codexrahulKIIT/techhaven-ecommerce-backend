export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <p className="text-gray-600 mb-6">Blog posts coming soon...</p>

      {/* Example blog posts */}
      <div className="space-y-6">
        <div className="p-4 border rounded-lg hover:shadow-md transition">
          <h2 className="text-xl font-semibold">How to Build a Modern Web App</h2>
          <p className="text-gray-500 text-sm">Posted on Sep 28, 2025</p>
          <p className="mt-2 text-gray-700">
            Learn the step-by-step process of creating a modern web application with React, Tailwind CSS, and a backend API.
          </p>
        </div>

        <div className="p-4 border rounded-lg hover:shadow-md transition">
          <h2 className="text-xl font-semibold">Top 5 Tips for PCB Design</h2>
          <p className="text-gray-500 text-sm">Posted on Sep 20, 2025</p>
          <p className="mt-2 text-gray-700">
            Discover essential tips for designing efficient and error-free PCBs for hardware projects.
          </p>
        </div>

        <div className="p-4 border rounded-lg rounded-lg hover:shadow-md transition">
          <h2 className="text-xl font-semibold">Understanding Server Development</h2>
          <p className="text-gray-500 text-sm">Posted on Sep 15, 2025</p>
          <p className="mt-2 text-gray-700">
            A beginner-friendly guide to setting up and managing backend servers for your applications.
          </p>
        </div>
      </div>
    </div>
  );
}
