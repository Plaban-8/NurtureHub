import Link from 'next/link';
import { Camera, Users, ShoppingCart, Lightbulb, Leaf } from 'lucide-react';
import { Navbar } from '@/components/navbar';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="relative flex flex-col items-center justify-center text-center py-20 md:py-32">
          
          <div 
            className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent"
            style={{
              maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black 70%, transparent 100%)'
            }}
          />

          <div className="relative z-10 px-4">
            <div className="inline-flex items-center rounded-full border border-transparent bg-accent text-accent-foreground px-4 py-2 font-semibold mb-4">
              <Leaf className="mr-2 h-4 w-4" />
              Your Personal Plant Care Companion
            </div>

            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight">
              Welcome to <span className="text-primary transition-transform duration-300 hover:scale-105 inline-block">NurtureHub</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
              Discover the joy of plant care with AI-powered recommendations, expert guidance, and a thriving community of plant enthusiasts. From beginner to expert, we're here to help your plants flourish.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-transparent">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Link href="/plant-disease-detection">
                  <div className="h-full rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-shadow p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Camera className="text-primary" />
                        <h3 className="text-2xl font-semibold leading-none tracking-tight">Plant Disease Detection</h3>
                      </div>
                      <div>
                          <p className="text-sm text-muted-foreground">Upload a photo of your plant to get an AI-powered diagnosis and care tips.</p>
                      </div>
                  </div>
                </Link>
                <Link href="/community">
                  <div className="h-full rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-shadow p-6">
                      <div className="flex items-center gap-2 mb-4">
                         <Users className="text-primary" />
                         <h3 className="text-2xl font-semibold leading-none tracking-tight">Community</h3>
                      </div>
                      <div>
                          <p className="text-sm text-muted-foreground">Connect with fellow plant lovers, share your progress, and get advice.</p>
                      </div>
                  </div>
                </Link>
                <Link href="/marketplace">
                  <div className="h-full rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-shadow p-6">
                      <div className="flex items-center gap-2 mb-4">
                         <ShoppingCart className="text-primary" />
                        <h3 className="text-2xl font-semibold leading-none tracking-tight">Marketplace</h3>
                      </div>
                      <div>
                          <p className="text-sm text-muted-foreground">Buy and sell plants, seeds, and gardening supplies with our community.</p>
                      </div>
                  </div>
                </Link>
                <Link href="/expert-solution">
                  <div className="h-full rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-shadow p-6">
                      <div className="flex items-center gap-2 mb-4">
                         <Lightbulb className="text-primary" />
                        <h3 className="text-2xl font-semibold leading-none tracking-tight">Expert Solution</h3>
                      </div>
                      <div>
                          <p className="text-sm text-muted-foreground">Get personalized advice and solutions from our plant care experts.</p>
                      </div>
                  </div>
                </Link>
            </div>
          </div>
        </section>
      </main>
       <footer className="bg-muted/50 border-t">
        <div className="container mx-auto py-8 px-4 text-center text-muted-foreground">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-headline text-2xl text-foreground">NurtureHub</span>
          </div>
           <p className="max-w-2xl mx-auto text-sm mb-6">
            A comprehensive plant care platform that connects plant enthusiasts through smart care management, community sharing, and marketplace features.
          </p>
        </div>
      </footer>
    </div>
  );
}
