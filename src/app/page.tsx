"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { 
  PlayCircle,
  Sparkles,
  Clock,
  Zap,
  ArrowRight,
  Check,
  Star,
} from "lucide-react";

const Home = () => {
  const { isSignedIn } = useUser();

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered Content",
      description:
        "Generate engaging video scripts using advanced AI technology",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Quick Creation",
      description: "Create professional videos in minutes, not hours",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Multiple Styles",
      description:
        "Choose from realistic, cartoon, comic, and more visual styles",
    },
  ];

  const benefits = [
    "AI-generated scripts and voiceovers",
    "Automatic caption generation",
    "Multiple video styles and formats",
    "30-60 second video options",
    "High-quality image generation",
    "Easy export and sharing",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/android-chrome-512x512.png"
              alt="ClipZap Logo"
              width={40}
              height={40}
            />
            <h1 className="text-2xl font-bold text-primary">ClipZap</h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {isSignedIn ? (
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <SignInButton>
                  <Button variant="ghost">Sign In</Button>
                </SignInButton>
                <SignUpButton>
                  <Button>Get Started</Button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Create Stunning
            <span className="text-primary"> AI Videos</span>
            <br />
            in Minutes
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your ideas into engaging short videos with AI-powered
            scripts, voiceovers, and visuals. No video editing experience
            required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {isSignedIn ? (
              <Link href="/dashboard/create-new">
                <Button size="lg" className="px-8 py-3 text-lg">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Create Your First Video
                </Button>
              </Link>
            ) : (
              <SignUpButton>
                <Button size="lg" className="px-8 py-3 text-lg">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Start Creating Free
                </Button>
              </SignUpButton>
            )}

            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
              <PlayCircle className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Hero Image/Video Preview */}
          <div className="relative max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border">
              <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
                <div className="text-center">
                  <PlayCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-gray-600">Video Preview Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Content Creators
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create professional videos with the power
              of AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl border hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Create professional videos in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "1",
                title: "Choose Your Content",
                description:
                  "Select from various topics or write your custom prompt",
              },
              {
                step: "2",
                title: "Select Style & Duration",
                description:
                  "Pick your preferred visual style and video length",
              },
              {
                step: "3",
                title: "Generate & Export",
                description: "Let AI create your video and export when ready",
              },
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full text-2xl font-bold mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
                {index < 2 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 h-6 w-6 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose ClipZap?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Create engaging content that stands out with our AI-powered
                video generation platform.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                {isSignedIn ? (
                  <Link href="/dashboard/create-new">
                    <Button size="lg" className="px-8">
                      Start Creating
                    </Button>
                  </Link>
                ) : (
                  <SignUpButton>
                    <Button size="lg" className="px-8">
                      Get Started Free
                    </Button>
                  </SignUpButton>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-blue-100 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">5.0 from creators</span>
                </div>
                <blockquote className="text-gray-700 italic">
                  ClipZap has revolutionized how I create content. What used to
                  take hours now takes minutes!
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Sarah Johnson</p>
                    <p className="text-sm text-gray-600">Content Creator</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Create Amazing Videos?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using ClipZap to produce
            engaging content effortlessly.
          </p>

          {isSignedIn ? (
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-3 text-lg"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <SignUpButton>
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-3 text-lg"
              >
                Start Free Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </SignUpButton>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/android-chrome-512x512.png"
                  alt="ClipZap Logo"
                  width={30}
                  height={30}
                />
                <h3 className="text-xl font-bold">ClipZap</h3>
              </div>
              <p className="text-gray-400">
                Create stunning AI-powered videos in minutes.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Examples
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ClipZap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
