<template>
  <div class="container mt-4">
    <h2>{{ editing ? 'Edit Thread' : 'New Thread' }}</h2>
    
    <form @submit.prevent="submitForm">
      <!-- Title Field -->
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input 
          v-model="title" 
          type="text" 
          class="form-control" 
          placeholder="Enter title" 
          required
        >
      </div>
      
      <!-- Category Field -->
      <div class="mb-3">
        <label class="form-label">Category</label>
        <div class="input-group">
          <!-- Category Dropdown -->
          <select 
            v-model="selectedCategory" 
            class="form-select"
            @change="handleCategoryChange"
          >
            <option value="">Select category</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
            <option value="new">Other (add new)</option>
          </select>
          
          <!-- Custom Category Input (only shows when "Other" selected) -->
          <input
            v-if="showCustomCategory"
            v-model="customCategory"
            type="text"
            class="form-control"
            placeholder="Enter new category"
            required
          >
        </div>
      </div>
      
      <!-- Content Field -->
      <div class="mb-3">
        <label class="form-label">Content</label>
        <textarea 
          v-model="content" 
          class="form-control" 
          placeholder="Enter content" 
          rows="5"
          required
        ></textarea>
      </div>
      
      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary">
        {{ editing ? 'Update Thread' : 'Create Thread' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  getDoc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../../firebase';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const props = defineProps(['id']);
const title = ref('');
const content = ref('');
const categories = ref([]);
const selectedCategory = ref('');
const customCategory = ref('');
const showCustomCategory = ref(false);
const editing = ref(false);
const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

// Fetch existing categories from Firestore
const fetchCategories = async () => {
  try {
    const categoriesSnapshot = await getDocs(collection(db, 'threads'));
    const uniqueCategories = new Set();
    
    categoriesSnapshot.forEach(doc => {
      const category = doc.data().category;
      if (category) uniqueCategories.add(category);
    });
    
    categories.value = Array.from(uniqueCategories).sort();
    
    // Add default categories if none exist
    if (categories.value.length === 0) {
      categories.value = ['Tech', 'Programming', 'Web Development', 'Design'];
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

// Handle category selection change
const handleCategoryChange = () => {
  showCustomCategory.value = (selectedCategory.value === 'new');
};

// Determine final category value
const getFinalCategory = () => {
  if (selectedCategory.value === 'new') {
    return customCategory.value.trim();
  }
  return selectedCategory.value;
};

// Submit form
const submitForm = async () => {
  const finalCategory = getFinalCategory();
  
  if (!finalCategory) {
    alert('Please select or enter a category');
    return;
  }
  
  // Validate category length
  if (finalCategory.length < 3 || finalCategory.length > 30) {
    alert('Category must be between 3-30 characters');
    return;
  }
  
  const threadData = {
    title: title.value,
    content: content.value,
    category: finalCategory,
    updatedAt: new Date()
  };

  try {
    if (editing.value) {
      await updateDoc(doc(db, 'threads', props.id), threadData);
      alert('Thread updated successfully!');
    } else {
      // Add author info when creating a new thread
      await addDoc(collection(db, 'threads'), {
        ...threadData,
        createdAt: new Date(),
        author: auth.user.uid,
        authorName: auth.user.email || 'Anonymous',
        authorEmail: auth.user.email || '',
        likes: { count: 0, users: {} }
      });
      alert('Thread created successfully!');
    }
    
    router.push('/threads');
  } catch (error) {
    console.error('Error saving thread:', error);
    alert(`Failed to save thread: ${error.message}`);
  }
};

// Initialize form
onMounted(async () => {
  await fetchCategories();
  
  if (props.id) {
    editing.value = true;
    
    try {
      const threadRef = doc(db, 'threads', props.id);
      const threadSnap = await getDoc(threadRef);
      
      if (threadSnap.exists()) {
        const threadData = threadSnap.data();
        title.value = threadData.title;
        content.value = threadData.content;
        
        if (threadData.category) {
          if (categories.value.includes(threadData.category)) {
            selectedCategory.value = threadData.category;
          } else {
            selectedCategory.value = 'new';
            customCategory.value = threadData.category;
            showCustomCategory.value = true;
          }
        }
      } else {
        alert('Thread not found!');
        router.push('/threads');
      }
    } catch (error) {
      console.error('Error loading thread:', error);
      alert(`Failed to load thread: ${error.message}`);
    }
  }
});
</script>

<style scoped>
.input-group {
  gap: 10px;
}

.form-select {
  flex: 0 0 200px;
}
</style>