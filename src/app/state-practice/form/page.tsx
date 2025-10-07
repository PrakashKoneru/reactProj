'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  age: number;
  country: string;
  interests: string[];
  newsletter: boolean;
  bio: string;
}

export default function FormExercise() {
  // TODO: Implement a form with the following features:
  // 1. Multiple input types (text, email, number, select, checkbox, textarea)
  // 2. Form validation
  // 3. Real-time form state updates
  // 4. Form submission handling
  // 5. Form reset functionality
  // 6. Show form data in real-time
  
  // Your implementation here:
  // Hint: Use a single state object for all form fields
  // Hint: Create a handleInputChange function for all inputs
  // Hint: Implement validation logic
  // Hint: Handle different input types (checkbox, select, etc.)
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: 0,
    country: '',
    interests: [],
    newsletter: false,
    bio: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const countries = ['USA', 'Canada', 'UK', 'Germany', 'France', 'Japan', 'Australia'];
  const interestOptions = ['Technology', 'Sports', 'Music', 'Travel', 'Cooking', 'Reading', 'Gaming'];

  // TODO: Implement handleInputChange function
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    // Your code here - handle different input types
    // Hint: Check e.target.type for 'checkbox'
    // Hint: Check e.target.name for 'interests' (array handling)
    // Hint: Use setFormData with spread operator to update specific fields
  };

  // TODO: Implement validation function
  const validateForm = (): boolean => {
    // Your code here - validate all fields
    // Hint: Check for required fields (name, email, age, country)
    // Hint: Validate email format with regex
    // Hint: Check age range (1-120)
    // Hint: Check if at least one interest is selected
    // Hint: Set errors state with validation messages
    // Hint: Return true if valid, false if not
    return false; // Replace this
  };

  // TODO: Implement form submission
  const handleSubmit = (e: FormEvent) => {
    // Your code here - prevent default, validate form, handle submission
  };

  // TODO: Implement form reset
  const handleReset = () => {
    // Your code here - reset all form data and errors
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-3xl font-bold text-green-600 mb-4">Form Submitted Successfully!</h1>
            <div className="bg-gray-100 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Submitted Data:</h3>
              <pre className="text-left text-sm text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
            <button
              onClick={handleReset}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Submit Another Form
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Form State Exercise
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Age Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age *
              </label>
              <input
                type="number"
                name="age"
                value={formData.age || ''}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.age ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your age"
                min="1"
                max="120"
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
            </div>

            {/* Country Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.country ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a country</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
            </div>

            {/* Interests Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interests * (Select at least one)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {interestOptions.map(interest => (
                  <label key={interest} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="interests"
                      value={interest}
                      checked={formData.interests.includes(interest)}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{interest}</span>
                  </label>
                ))}
              </div>
              {errors.interests && <p className="text-red-500 text-sm mt-1">{errors.interests}</p>}
            </div>

            {/* Newsletter Field */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Subscribe to newsletter
                </span>
              </label>
            </div>

            {/* Bio Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us about yourself"
              />
            </div>

            {/* Submit and Reset Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                Submit Form
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
              >
                Reset Form
              </button>
            </div>
          </form>

          {/* Real-time Form Data Display */}
          <div className="mt-8 bg-gray-100 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Real-time Form Data:</h3>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>

          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Exercise Goals:</h4>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>□ Use single state object for all form fields</li>
              <li>□ Handle different input types (text, email, number, select, checkbox, textarea)</li>
              <li>□ Implement form validation with error state</li>
              <li>□ Update state on every input change</li>
              <li>□ Handle form submission and reset</li>
              <li>□ Show real-time form data updates</li>
            </ul>
            <div className="mt-3 p-3 bg-blue-50 rounded">
              <p className="text-blue-800 text-sm font-medium">💡 Tips:</p>
              <ul className="text-blue-700 text-xs mt-1 space-y-1">
                <li>• Use e.target.type to check if it's a checkbox</li>
                <li>• For interests array, check if checked and add/remove from array</li>
                <li>• Use spread operator to update specific fields: {...prev, [name]: value}</li>
                <li>• Clear errors when user starts typing</li>
                <li>• Use preventDefault() in form submission</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}