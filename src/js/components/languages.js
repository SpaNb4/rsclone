import locizify from 'locizify';

const loc_projectId = 'a0a8f50e-6410-40b5-8e4d-bf4952fde133';
const loc_apikey = '7944dbd0-7248-412b-8ca3-4b7abd39fdf3';
const loc_version = 'latest';

locizify.init({
    backend: {
        projectId: loc_projectId,
        apiKey: loc_apikey,
        version: loc_version,
        allowedAddOrUpdateHosts: ['localhost'],
    },
    // optional
    // ignoreIds: ['ignoreMeId'],
    ignoreClasses: ['flip-card__back', 'display','menu_btn'],
});
