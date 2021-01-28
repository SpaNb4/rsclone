import locizify from 'locizify';

const loc_projectId = '67ad2d21-8e1c-412f-a776-e5bb3b32d25c';
const loc_apikey = '5a810be2-b20a-4c9f-9afa-4d6c3692bb82';
const loc_version = 'latest';

locizify.init({
    backend: {
        projectId: loc_projectId,
        apiKey: loc_apikey,
        version: loc_version,
        allowedAddOrUpdateHosts: ['localhost'],
    },
    ignoreClasses: ['flip-card__back', 'display','menu_btn'],
});
