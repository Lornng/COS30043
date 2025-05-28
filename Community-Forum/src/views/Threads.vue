<template>
  <div class="container mt-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Latest Threads</h1>
      <router-link 
        v-if="auth.user"
        to="/create-thread"
        class="btn btn-primary"
      >
        <i class="bi bi-plus-circle me-1"></i> New Thread
      </router-link>
    </div>

    <!-- Search and Filters Section -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row g-3">
          <!-- Search Bar -->
          <div class="col-md-6">
            <div class="input-group">
              <span class="input-group-text">
                <i class="bi bi-search"></i>
              </span>
              <input
                v-model="searchQuery"
                type="text"
                class="form-control"
                placeholder="Search by title or content..."
                @keyup.enter="currentPage = 1"
              >
            </div>
          </div>

          <!-- Category Filter -->
          <div class="col-md-3">
            <select v-model="categoryFilter" class="form-select">
              <option value="">All Categories</option>
              <option v-for="category in availableCategories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>

          <!-- Date Filter -->
          <div class="col-md-3">
            <select v-model="dateFilter" class="form-select">
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
        
        <!-- Advanced Filters Toggle -->
        <div class="mt-3 text-end">
          <button 
            @click="showAdvancedFilters = !showAdvancedFilters"
            class="btn btn-sm btn-outline-secondary"
          >
            <i class="bi bi-funnel me-1"></i>
            {{ showAdvancedFilters ? 'Hide' : 'Show' }} Advanced Filters
          </button>
        </div>

        <!-- Advanced Filters -->
        <div v-if="showAdvancedFilters" class="row g-3 mt-2">
          <!-- Author Filter -->
          <div class="col-md-4">
            <input 
              v-model="authorFilter"
              type="text"
              class="form-control"
              placeholder="Filter by author..."
            >
          </div>
          
          <!-- Likes Filter -->
          <div class="col-md-4">
            <select v-model="likesFilter" class="form-select">
              <option value="0">Any Likes</option>
              <option value="5">5+ Likes</option>
              <option value="10">10+ Likes</option>
              <option value="20">20+ Likes</option>
            </select>
          </div>
          
          <!-- Sort Options -->
          <div class="col-md-4">
            <select v-model="sortOption" class="form-select">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="most-liked">Most Liked</option>
              <option value="least-liked">Least Liked</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Summary -->
    <div v-if="activeFilterCount" class="mb-3">
      <span class="badge bg-info me-2">
        {{ activeFilterCount }} active filters
      </span>
      <button @click="resetFilters" class="btn btn-sm btn-outline-danger">
        Reset All Filters
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading threads...</p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="alert alert-danger">
      <i class="bi bi-exclamation-triangle me-2"></i> 
      {{ error }}
      <button @click="loadThreads" class="btn btn-sm btn-outline-danger ms-3">
        Retry
      </button>
    </div>

    <!-- Thread List -->
    <div v-if="!loading && !error">
      <!-- Empty State -->
      <div v-if="filteredThreads.length === 0" class="alert alert-info">
        <i class="bi bi-info-circle me-2"></i>
        No threads found. Try a different search term or create a new thread!
      </div>

      <!-- Thread Cards -->
      <div class="row">
        <div 
          v-for="thread in paginatedThreads" 
          :key="thread.id"
          class="col-xl-4 col-lg-6 col-md-6 mb-4"
        >
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">
                <router-link :to="`/thread/${thread.id}`" class="text-decoration-none">
                  {{ thread.title }}
                </router-link>
              </h5>
              
              <p class="card-text line-clamp-2">{{ thread.content }}</p>
              
              <div class="d-flex justify-content-between mt-3">
                <span class="badge bg-primary">
                  {{ thread.category }}
                </span>
                <small class="text-muted">
                  {{ formatDate(thread.createdAt) }}
                </small>
              </div>
            </div>
            
            <div class="card-footer bg-transparent d-flex justify-content-between">
              <!-- Like Button -->
              <button 
                @click="toggleLike(thread.id, thread.likes)"
                :class="['btn btn-sm', {
                  'btn-primary': hasUserLiked(thread.likes),
                  'btn-outline-primary': !hasUserLiked(thread.likes)
                }]"
                :disabled="!auth.user"
                :title="auth.user ? '' : 'Login to like threads'"
              >
                <i class="bi" :class="{
                  'bi-heart-fill': hasUserLiked(thread.likes),
                  'bi-heart': !hasUserLiked(thread.likes)
                }"></i>
                {{ getLikeCount(thread.likes) }}
              </button>
              
              <!-- Author Info -->
              <div>
                <small class="text-muted d-block">
                  <i class="bi bi-person me-1"></i>
                  {{ thread.authorName || 'System' }}
                </small>
              </div>
              
              <!-- Author Actions -->
              <div v-if="auth.user?.uid === thread.author">
                <router-link 
                  :to="`/edit-thread/${thread.id}`"
                  class="btn btn-sm btn-outline-secondary me-2"
                  title="Edit Thread"
                >
                  <i class="bi bi-pencil"></i>
                </router-link>
                
                <button 
                  @click="deleteThread(thread.id)"
                  class="btn btn-sm btn-outline-danger"
                  title="Delete Thread"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <nav v-if="totalPages > 1">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button 
              class="page-link" 
              @click="currentPage = currentPage - 1"
            >
              &laquo;
            </button>
          </li>
          
          <li 
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: currentPage === page }"
          >
            <button 
              class="page-link" 
              @click="currentPage = page"
            >
              {{ page }}
            </button>
          </li>
          
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button 
              class="page-link" 
              @click="currentPage = currentPage + 1"
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { 
  collection, 
  query, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc,
  getDocs
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuthStore } from '../stores/auth';
import { format, startOfToday, startOfWeek, startOfMonth, isWithinInterval } from 'date-fns';

const auth = useAuthStore();
const threads = ref([]);
const searchQuery = ref('');
const categoryFilter = ref('');
const dateFilter = ref('all');
const authorFilter = ref('');
const likesFilter = ref('0');
const sortOption = ref('newest');
const showAdvancedFilters = ref(false);
const availableCategories = ref([]);
const loading = ref(true);
const error = ref(null);
const currentPage = ref(1);
const itemsPerPage = ref(6);
let unsubscribe = null;

// Fetch threads with real-time updates
const loadThreads = () => {
  loading.value = true;
  error.value = null;
  
  try {
    const q = query(collection(db, 'threads'));
    
    unsubscribe = onSnapshot(q, (querySnapshot) => {
      threads.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      loading.value = false;
      
      // Extract unique categories
      const categories = new Set();
      threads.value.forEach(thread => {
        if (thread.category) categories.add(thread.category);
      });
      availableCategories.value = Array.from(categories).sort();
    }, (err) => {
      error.value = `Failed to load threads: ${err.message}`;
      loading.value = false;
    });
    
  } catch (err) {
    error.value = `Error setting up listener: ${err.message}`;
    loading.value = false;
  }
};

// Format Firestore timestamp
const formatDate = (timestamp) => {
  if (!timestamp?.seconds) return 'Unknown date';
  return format(new Date(timestamp.seconds * 1000), 'MMM d, yyyy');
};

// Get consistent like count
const getLikeCount = (likesData) => {
  if (!likesData) return 0;
  
  if (typeof likesData === 'number') {
    return likesData;
  }
  
  if (typeof likesData === 'object') {
    return likesData.count || 0;
  }
  
  return 0;
};

// Check if current user has liked
const hasUserLiked = (likesData) => {
  if (!auth.user || !likesData) return false;
  
  if (typeof likesData === 'object' && likesData.users) {
    return !!likesData.users[auth.user.uid];
  }
  
  return false;
};

// Toggle like
const toggleLike = async (threadId, likesData) => {
  if (!auth.user) return;
  
  try {
    const userId = auth.user.uid;
    const threadRef = doc(db, 'threads', threadId);
    
    // Normalize like data
    const currentLikes = normalizeLikes(likesData);
    const userHasLiked = currentLikes.users[userId] || false;
    
    // Calculate new like state
    const newLikes = {
      count: userHasLiked ? currentLikes.count - 1 : currentLikes.count + 1,
      users: {
        ...currentLikes.users,
        [userId]: !userHasLiked
      }
    };
    
    await updateDoc(threadRef, { likes: newLikes });
  } catch (err) {
    console.error('Like toggle failed:', err);
    alert(`Couldn't update like: ${err.message}`);
  }
};

// Normalize like data
const normalizeLikes = (likesData) => {
  if (!likesData) return { count: 0, users: {} };
  
  if (typeof likesData === 'number') {
    return {
      count: likesData,
      users: {}
    };
  }
  
  if (typeof likesData === 'object') {
    return {
      count: likesData.count || 0,
      users: likesData.users || {}
    };
  }
  
  return { count: 0, users: {} };
};

// Delete thread
const deleteThread = async (threadId) => {
  if (!confirm('Are you sure you want to delete this thread?')) return;
  
  try {
    await deleteDoc(doc(db, 'threads', threadId));
  } catch (err) {
    console.error('Delete failed:', err);
    alert(`Couldn't delete thread: ${err.message}`);
  }
};

// Computed: Filtered and sorted threads
const filteredThreads = computed(() => {
  let result = [...threads.value];
  
  // Text search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(thread => 
      thread.title.toLowerCase().includes(query) ||
      thread.content.toLowerCase().includes(query)
    );
  }
  
  // Category filter
  if (categoryFilter.value) {
    result = result.filter(thread => 
      thread.category === categoryFilter.value
    );
  }
  
  // Date filter
  if (dateFilter.value !== 'all') {
    const today = startOfToday();
    const now = new Date();
    
    result = result.filter(thread => {
      if (!thread.createdAt?.seconds) return false;
      const threadDate = new Date(thread.createdAt.seconds * 1000);
      
      switch (dateFilter.value) {
        case 'today':
          return threadDate >= today;
        case 'week':
          return threadDate >= startOfWeek(now);
        case 'month':
          return threadDate >= startOfMonth(now);
        default:
          return true;
      }
    });
  }
  
  // Author filter
  if (authorFilter.value) {
    const authorQuery = authorFilter.value.toLowerCase();
    result = result.filter(thread => 
      (thread.authorName && thread.authorName.toLowerCase().includes(authorQuery)) ||
      (thread.authorEmail && thread.authorEmail.toLowerCase().includes(authorQuery))
    );
  }
  
  // Likes filter
  const minLikes = parseInt(likesFilter.value);
  if (minLikes > 0) {
    result = result.filter(thread => 
      getLikeCount(thread.likes) >= minLikes
    );
  }
  
  // Sorting
  switch (sortOption.value) {
    case 'newest':
      return result.sort((a, b) => 
        (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
      );
    case 'oldest':
      return result.sort((a, b) => 
        (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0)
      );
    case 'most-liked':
      return result.sort((a, b) => 
        getLikeCount(b.likes) - getLikeCount(a.likes)
      );
    case 'least-liked':
      return result.sort((a, b) => 
        getLikeCount(a.likes) - getLikeCount(b.likes)
      );
    default:
      return result;
  }
});

// Computed: Paginated threads
const paginatedThreads = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredThreads.value.slice(start, end);
});

// Computed: Total pages
const totalPages = computed(() => 
  Math.ceil(filteredThreads.value.length / itemsPerPage.value)
);

// Computed: Active filter count
const activeFilterCount = computed(() => {
  let count = 0;
  if (searchQuery.value) count++;
  if (categoryFilter.value) count++;
  if (dateFilter.value !== 'all') count++;
  if (authorFilter.value) count++;
  if (parseInt(likesFilter.value) > 0) count++;
  return count;
});

// Reset all filters
const resetFilters = () => {
  searchQuery.value = '';
  categoryFilter.value = '';
  dateFilter.value = 'all';
  authorFilter.value = '';
  likesFilter.value = '0';
  sortOption.value = 'newest';
  currentPage.value = 1;
};

// Watch filters to reset pagination
watch([searchQuery, categoryFilter, dateFilter, authorFilter, likesFilter, sortOption], () => {
  currentPage.value = 1;
});

// Lifecycle hooks
onMounted(loadThreads);
onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.badge.bg-primary {
  font-size: 0.85rem;
}
</style>