import alt from 'alt-server'

alt.onClient('re', () => {
    alt.restartResource(alt.resourceName)
})

alt.on('playerConnect', (player) => {
    player.spawn('mp_m_freemode_01', new alt.Vector3(0, 0, 72))
})
