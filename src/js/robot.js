// Hero robot: CSS 3D head turns toward the cursor, pupils follow

const MAX_YAW = 30;   // deg, left/right
const MAX_PITCH = 16; // deg, up/down

export function initRobot() {
    const scene = document.getElementById('robot-scene');
    const head = document.getElementById('robot-head');
    if (!scene || !head) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // No fine pointer (touch devices): slow auto look-around via CSS instead
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        head.classList.add('robot-auto');
        return;
    }

    let targetYaw = 0, targetPitch = 0;
    let yaw = 0, pitch = 0;
    let rafId = null;

    const clamp = (v) => Math.max(-1, Math.min(1, v));

    window.addEventListener('mousemove', (e) => {
        const rect = scene.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        targetYaw = clamp((e.clientX - cx) / (window.innerWidth / 2)) * MAX_YAW;
        targetPitch = clamp((cy - e.clientY) / (window.innerHeight / 2)) * MAX_PITCH;
        if (rafId === null) rafId = requestAnimationFrame(tick);
    }, { passive: true });

    function tick() {
        // Ease toward the target for a natural, slightly lagging head turn
        yaw += (targetYaw - yaw) * 0.09;
        pitch += (targetPitch - pitch) * 0.09;

        head.style.setProperty('--ry', `${yaw.toFixed(2)}deg`);
        head.style.setProperty('--rx', `${pitch.toFixed(2)}deg`);
        // Pupils drift in the look direction
        head.style.setProperty('--px', `${(yaw / MAX_YAW * 5).toFixed(2)}px`);
        head.style.setProperty('--py', `${(-pitch / MAX_PITCH * 3.5).toFixed(2)}px`);

        if (Math.abs(targetYaw - yaw) > 0.04 || Math.abs(targetPitch - pitch) > 0.04) {
            rafId = requestAnimationFrame(tick);
        } else {
            rafId = null;
        }
    }
}
