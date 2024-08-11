document.addEventListener('DOMContentLoaded', () => {
    const sortBy = document.getElementById('sort-by');
    const showPerPage = document.getElementById('show-per-page');
    const postList = document.getElementById('post-list');
    const paginationInfo = document.getElementById('pagination-info');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentPage = 1;
    let postsPerPage = parseInt(showPerPage.value);
    let totalPosts = 0; 
    let sortOrder = '-published_at'; 

    async function fetchPosts(page = 1, perPage = 10, sort = '-published_at') {
        const url = `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${page}&page[size]=${perPage}&append[]=small_image&append[]=medium_image&sort=${sort}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            const data = await response.json();

            totalPosts = data.meta.total;
            renderPosts(data.data);

            paginationInfo.textContent = `Showing ${(page - 1) * perPage + 1}-${Math.min(page * perPage, totalPosts)} of ${totalPosts}`;
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    function renderPosts(posts) {
        postList.innerHTML = ''; 

        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('post-card');
            postCard.innerHTML = `
                <img src="${post.small_image}" alt="${post.title}">
                <div class="post-content">
                    <h2 class="title">${post.title}</h2>
                    <p class="description">${post.content_excerpt}</p>
                </div>
            `;
            postList.appendChild(postCard);
        });
    }

    sortBy.addEventListener('change', () => {
        sortOrder = sortBy.value === 'newest' ? '-published_at' : 'published_at';
        fetchPosts(currentPage, postsPerPage, sortOrder);
    });

    showPerPage.addEventListener('change', () => {
        postsPerPage = parseInt(showPerPage.value);
        fetchPosts(currentPage, postsPerPage, sortOrder);
    });

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchPosts(currentPage, postsPerPage, sortOrder);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < Math.ceil(totalPosts / postsPerPage)) {
            currentPage++;
            fetchPosts(currentPage, postsPerPage, sortOrder);
        }
    });

    fetchPosts(currentPage, postsPerPage, sortOrder);
});

document.addEventListener('DOMContentLoaded', function () {
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScrollTop = scrollTop;
    });

    const currentPage = window.location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('.menu-item a');

    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.parentElement.classList.add('active');
        }
    });
});

window.addEventListener('scroll', function () {
    const bannerImage = document.querySelector('.banner-image');
    let scrollPos = window.pageYOffset;

    bannerImage.style.transform = 'translateY(' + scrollPos * 0.5 + 'px) skewY(-2.5deg)';
});

document.addEventListener('DOMContentLoaded', () => {
    const showPerPageSelect = document.getElementById('show-per-page');
    let itemsPerPage = parseInt(showPerPageSelect.value);
    let currentPage = 1;

    function updatePagination(totalPages) {
        const paginationControls = document.querySelector('.pagination-controls');
        const pageNumbers = paginationControls.querySelector('.page-numbers');
        
        pageNumbers.innerHTML = ''; // Clear existing page numbers

        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, currentPage + 1);

        if (totalPages > 3) {
            if (currentPage === 1) {
                endPage = Math.min(totalPages, 3);
            } else if (currentPage === totalPages) {
                startPage = Math.max(1, totalPages - 2);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageSpan = document.createElement('span');
            pageSpan.textContent = i;
            pageSpan.className = 'page-number' + (i === currentPage ? ' active' : '');
            pageNumbers.appendChild(pageSpan);
        }
    }

    function updatePageNumbers() {
        const totalItems = 274;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        updatePagination(totalPages);
    }

    showPerPageSelect.addEventListener('change', () => {
        itemsPerPage = parseInt(showPerPageSelect.value);
        updatePageNumbers();
    });

    document.querySelector('.pagination-controls').addEventListener('click', (event) => {
        if (event.target.classList.contains('prev')) {
            if (currentPage > 1) {
                currentPage--;
                updatePageNumbers();
            }
        } else if (event.target.classList.contains('next')) {
            const totalItems = 274;
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                updatePageNumbers();
            }
        }
    });

    updatePageNumbers();
});

