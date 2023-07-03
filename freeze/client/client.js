import alt from 'alt-client'

let rml = null
let tick = null

const repro = () => {
    rml?.destroy()
    tick?.destroy()

    rml = new alt.RmlDocument('/client/index.rml')
    alt.loadRmlFont('/client/arial.ttf', 'arial')

    const container = rml.createElement('div')

    container.style['position'] = 'absolute'
    container.style['text-align'] = 'center'
    container.style['background-color'] = '#ffffff22'

    const name = rml.createElement('div')
    name.style['font-family'] = 'arial'
    name.style['font-size'] = '5rem'
    name.style['font-effect'] = 'outline(5rem #00000055)'
    name.innerRML = 'i hate this'
    container.appendChild(name)

    rml.appendChild(container)

    const _tick = new alt.Utils.EveryTick(() => {
        if (!rml?.valid) return

        const screenPosition = alt.worldToScreen(alt.Player.local.pos.add(0, 0, 1));
        const width = alt.getScreenResolution().x
        const height = 200
        container.style['left'] = `${screenPosition.x - width / 2}px`;
        container.style['top'] = `${screenPosition.y - height / 2}px`;
        container.style['width'] = `${width}px`
        container.style['height'] = `${height}px`
    })
    tick = _tick

    alt.toggleRmlControls(true)
    alt.showCursor(true)
}

new alt.Utils.Interval(() => {
    repro()
}, 100)

alt.setTimeout(() => {
    alt.log('restarting')
    alt.emitServer('re')
}, 10_000)
