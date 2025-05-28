//this script is used to lodge in the local testing threads.json into Firebase database
// to execute them >> main.js 
// modify main.js by adding the line below:
// import { seedThreads } from './utils/seedFirestore';
// seedThreads();
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import threadsData from '../../public/data/threads.json'; 

export const seedThreads = async () => {
  try {
    console.log('11111111111111111111Starting data import...');
    
    for (const thread of threadsData) {
      console.log('Processing thread:', thread.title);
      
      // Convert date string to Firestore timestamp
      const threadDate = new Date(thread.date);
      
      await addDoc(collection(db, 'threads'), {
        title: thread.title,
        content: thread.content,
        category: thread.category,
        likes: 0,
        createdAt: Timestamp.fromDate(threadDate),
        author: 'system' // Temporary author for seeding
      });
    }
    
    console.log('✅ Success: All threads imported to Firestore!');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  }
};
