import locizify from 'locizify';

const locProjectId = '67ad2d21-8e1c-412f-a776-e5bb3b32d25c';
const locApikey = '5a810be2-b20a-4c9f-9afa-4d6c3692bb82';
const locVersion = 'latest';

locizify.init({
    backend: {
        projectId: locProjectId,
        apiKey: locApikey,
        version: locVersion,
        allowedAddOrUpdateHosts: ['localhost'],
    },
    ignoreClasses: ['flip-card__back', 'display', 'menu_btn'],
});
