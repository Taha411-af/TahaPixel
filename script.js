// Load videos from localStorage
function loadVideos() {
    const videos = JSON.parse(localStorage.getItem('tahaPixelVideos')) || [];
    displayVideos(videos);
}

// Display videos on the page
function displayVideos(videos) {
    const videosList = document.getElementById('videosList');
    
    if (videos.length === 0) {
        videosList.innerHTML = '<p class="empty-message">هنوز ویدیویی اضافه نشده است</p>';
        return;
    }

    videosList.innerHTML = videos.map((video, index) => `
        <div class="video-card">
            <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail" onclick="openVideo('${video.link}')">
            <div class="video-info">
                <div class="video-title">${video.title}</div>
                <div class="video-description">${video.description || 'بدون توضیح'}</div>
                <div>
                    <a href="${video.link}" target="_blank" class="video-link">▶️ تماشا</a>
                    <button class="btn-delete" onclick="deleteVideo(${index})">🗑️ حذف</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add new video
function addVideo() {
    const title = document.getElementById('videoTitle').value.trim();
    const link = document.getElementById('videoLink').value.trim();
    const thumbnail = document.getElementById('thumbnailLink').value.trim();
    const description = document.getElementById('videoDescription').value.trim();

    if (!title || !link || !thumbnail) {
        alert('لطفاً تمام فیلدهای الزامی را پر کنید!');
        return;
    }

    // Validate URLs
    if (!isValidUrl(link) || !isValidUrl(thumbnail)) {
        alert('لطفاً لینک های معتبر وارد کنید!');
        return;
    }

    const videos = JSON.parse(localStorage.getItem('tahaPixelVideos')) || [];
    videos.push({
        title,
        link,
        thumbnail,
        description,
        dateAdded: new Date().toLocaleString('fa-IR')
    });

    localStorage.setItem('tahaPixelVideos', JSON.stringify(videos));

    // Clear form
    document.getElementById('videoTitle').value = '';
    document.getElementById('videoLink').value = '';
    document.getElementById('thumbnailLink').value = '';
    document.getElementById('videoDescription').value = '';

    alert('ویدیو با موفقیت اضافه شد! ✅');
    loadVideos();
}

// Delete video
function deleteVideo(index) {
    if (!confirm('آیا از حذف این ویدیو اطمینان دارید؟')) {
        return;
    }

    const videos = JSON.parse(localStorage.getItem('tahaPixelVideos')) || [];
    videos.splice(index, 1);
    localStorage.setItem('tahaPixelVideos', JSON.stringify(videos));
    
    alert('ویدیو حذف شد! ✅');
    loadVideos();
}

// Open video
function openVideo(link) {
    window.open(link, '_blank');
}

// Validate URL
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Load videos when page loads
document.addEventListener('DOMContentLoaded', loadVideos);