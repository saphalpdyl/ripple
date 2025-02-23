"use client";

import Image from "next/image"
import { Plus, BookOpen, Trophy, Users, BarChart, FileArchive } from "lucide-react"
import { OrbitControls, Stage } from "@react-three/drei"
import { Canvas } from "@react-three/fiber";
import MapLoader from "@/components/three/map-loader";
import MapDisplayItem from "@/components/three/map-display-item";
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

import { File } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/ripple_logo.png" alt="Ripple Logo" width={50} height={50} />
            <p className="ml-3 text-gray-600 text-xl italic">Learning Gamified.</p>
          </div>
          <nav className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Dashboard
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Decks
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Profile
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
        <section className="flex-1 bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Deck Sources</h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">Start creating your new deck by adding sources.</p>
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  <Plus className="mr-2" size={20} />
                  Add Source
                </button>
              </DialogTrigger>
              <DialogContent className="min-w-[800px]">
                <DialogTitle>
                </DialogTitle>
                <div className="flex flex-col items-start justify-center gap-3 h-[500px] min-w-[400px]">
                  <span className="text-3xl font-bold ">Add Source Decks</span>
                  <p className="text-sm italic text-gray-600">Create source decks from uploaded-pdfs or connect directly to canvas</p>
                  <hr />
                  <div className="flex gap-3 w-full">
                    <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-12 gap-6 w-full hover:bg-gray-200">
                      <FileArchive size={120} className="text-gray-500" />
                      <form onSubmit={e => {
                        e.preventDefault();
                        
                      }}
                        className="flex flex-col items-center"
                      >
                        <input type="file" accept="pdf" className="text-xl text-gray-600"/>
                        <button className="Uploaded">Upload from computer</button>
                      </form>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-12 gap-6 w-full hover:bg-gray-200">
                      <Image src="/canvas_logo.png" alt="ss" width={100} height={100}/>
                      <span className="text-md p-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600">Login in to canvas</span>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>
        <section className="flex-1 bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Self practice</h2>
        </section>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={BookOpen} title="Total Decks" value="12" />
          <StatCard icon={Trophy} title="Mastered Cards" value="143" />
          <StatCard icon={Users} title="Study Groups" value="3" />
          <StatCard icon={BarChart} title="Weekly Progress" value="78%" />
        </div>

        {/* Recent Activity */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            <ActivityItem title="Completed 'JavaScript Basics' deck" time="2 hours ago" />
            <ActivityItem title="Created new deck 'React Hooks'" time="1 day ago" />
            <ActivityItem title="Joined 'Web Development' study group" time="3 days ago" />
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Unlocked Maps</h2>
          <div className="flex items-center justify-between">
            <div className="h-64 flex items-center">
              <MapDisplayItem path="/ground_plains.glb" />
              <MapDisplayItem path="/table_snow.glb" />
              <MapDisplayItem path="/table_fire.glb" />
            </div>
          </div>
        </section>

        {/* Recommended Decks */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommended Decks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DeckCard title="Python for Beginners" cards={50} category="Programming" />
            <DeckCard title="World History: Ancient Civilizations" cards={75} category="History" />
            <DeckCard title="Introduction to Psychology" cards={60} category="Social Sciences" />
          </div>
        </section>
      </main>
    </div>
  )
}

function StatCard({ icon: Icon, title, value }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center">
      <Icon className="text-blue-500 mr-4" size={24} />
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-2xl font-bold text-blue-600">{value}</p>
      </div>
    </div>
  )
}

function ActivityItem({ title, time }) {
  return (
    <li className="flex justify-between items-center">
      <span className="text-gray-800">{title}</span>
      <span className="text-sm text-gray-500">{time}</span>
    </li>
  )
}

function DeckCard({ title, cards, category }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">{cards} cards</p>
      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{category}</span>
    </div>
  )
}

