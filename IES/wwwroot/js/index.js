const navigateToPdfUrl = (documentLink) => window.open(documentLink, '_blank');

const getPage = (pdfContainer, pdfDoc) => {
    const pageInfo = pdfContainer.querySelector('.page-info');

    const numberOfPages = pdfDoc.numPages;
    pageInfo.textContent = `${numberOfPages} page${numberOfPages > 1 ? 's' : ''}`;

    return pdfDoc.getPage(1);
}

const renderPage = (canvas, page) => {
    const viewport = page.getViewport({ scale: 1 });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const canvasContext = canvas.getContext('2d');

    return page.render({ canvasContext, viewport }).promise;
};

const renderSize = (canvas, pdfContainer, pdfUrl) => {
    const pdfSizeInfo = pdfContainer.querySelector('.pdf-size-info');
    const pdfLoaderContainer = pdfContainer.querySelector('.loader-container');

    pdfLoaderContainer.insertAdjacentHTML('afterend', `
        <div class="overflow-hidden rounded-2">    
            <img src="${canvas.toDataURL()}" class="img-fluid object-fit-cover aspect-ratio-16x9 object-position-top pdf-hover" alt="PDF Preview">
        </div>
    `);

    pdfLoaderContainer.remove();

    fetch(pdfUrl)
        .then(response => response.headers.get('content-length'))
        .then(size => {
            pdfSizeInfo.textContent = `${Math.ceil(size / 1024)} KB`;
        });
};

const catchError = (pdfContainer, error) =>  {
    const pdfLoaderContainer = pdfContainer.querySelector('.loader-container');
    const pageInfo = pdfContainer.querySelector('.page-info');
    const pdfSizeInfo = pdfContainer.querySelector('.pdf-size-info');

    pdfLoaderContainer.insertAdjacentHTML('afterend', `
        <img src="/img/pdf-not-found.png" class="rounded-2 img-fluid object-fit-cover aspect-ratio-16x9" alt="PDF Not Found">
    `);
    pdfSizeInfo.textContent = 'Error';
    pageInfo.textContent = 'Error';

    pdfLoaderContainer.remove();

    console.error('Error rendering PDF:', error);
}
