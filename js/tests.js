/*
	Credits for the WAAPI tests go to Dan Wilson:
		http://codepen.io/danwilson/pen/xGBKVq?editors=0010
	
	Thanks! :)
*/


function handleOnFinish() {
  performBasicTest(true, 'test-pof');
}
function handleOnCancel() {
  performBasicTest(true, 'test-poc');
}
function handleFinished() {
  performBasicTest(true, 'test-pfp');
}
function handleReady() {
  performBasicTest(true, 'test-prp');
}

var animateTest = document.getElementById('test-animate');
var animateTestAsArray = document.getElementById('test-animate-kfa');
var animateTestAsObject = document.getElementById('test-animate-kfo');

if (animateTest.animate !== undefined) {
  animateTest.classList.add('passed');
  var player = animateTestAsArray.animate([
    {opacity:1},
    {opacity:.5},
    {opacity:1}
  ,], {
    iterations: 1,
    duration: 100,
    id: 'ISetTheId'
  });
  var player3 = animateTestAsArray.animate([
    {opacity:1},
    {opacity:.5},
    {opacity:1}
  ,], {
    iterations: 1,
    duration: 100
  });
  if (player) {
    performBasicTest(true, 'test-animate-kfa');
    player.onfinish = handleOnFinish;
    if (player.finished && player.finished.then) {
      player.finished.then(handleFinished);
    }
    if (player.ready && player.ready.then) {
      player.ready.then(handleReady);
    }
  }
  if (player3) {
    player3.oncancel = handleOnCancel;
    if (typeof player3.cancel === 'function') {
      player3.cancel();
    }
  }
  try {
    var player2 = animateTestAsObject.animate({ opacity: [1,.5,1] }, {
      iterations: 1,
      duration: 100
    });
    if (player2 && (typeof player2.play === 'function') && player2.currentTime >= 0 && window.getComputedStyle) {
      player2.pause();
      player2.currentTime = 50;
     console.log((parseFloat(window.getComputedStyle(animateTestAsObject).opacity))); performBasicTest((parseFloat(window.getComputedStyle(animateTestAsObject).opacity) === 0.5), 'test-animate-kfo');

      player2.play();
      player2.onfinish = handleOnFinish;
    }
  } catch(e) {}
  
  performBasicTest((player.id === 'ISetTheId'), 'test-pid');
  
  performBasicTest((typeof player.play === 'function'), 'test-pcp');
  performBasicTest((typeof player.pause === 'function'), 'test-pcs');
  performBasicTest((typeof player.reverse === 'function'), 'test-pcr');
  performBasicTest((typeof player.cancel === 'function'), 'test-pcc');
  performBasicTest((typeof player.finish === 'function'), 'test-pcf');
  performBasicTest((player.playbackRate !== undefined), 'test-pbr');
  performBasicTest((player.currentTime !== undefined && player.startTime !== undefined), 'test-ctst');
  performBasicTest((player.effect !== undefined), 'test-pe');
}
performBasicTest((typeof animateTest.getAnimations === 'function'), 'test-ega');


var options = {
  duration: 1234,
  fill: 'backwards',
  direction: 'alternate',
  iterations: 3,
  delay: 123,
  easing: 'ease-in-out',
  spacing: 'paced(opacity)',
  composite: 'add',
  iterationComposite: 'accumulate'
};
if (window.KeyframeEffect !== undefined) {
  performBasicTest(true, 'test-kec');
  var kfetest = document.getElementById('test-kec');
  try {
    var kfe = new KeyframeEffect(kfetest, [{opacity:0},{opacity:1}], options);
    if (kfe) {
      var kfeTests = document.querySelectorAll('[id*="test-kec-"]');
      for (var i = 0, l = kfeTests.length; i < l; i++) {
        var currentTest = kfeTests[i];
        var option = currentTest.id.replace('test-kec-','');
        if (options[option] == kfe[option] || (kfe.timing && options[option] == kfe.timing[option])) {
          performBasicTest(true, currentTest.id);
        }
      }
    }
  } catch(e) {}
}

performBasicTest((window.Animation !== undefined), 'test-ac');

var timeline = performBasicTest((document.timeline !== undefined), 'test-dt');
if (timeline) {
  performBasicTest((document.timeline.currentTime !== undefined), 'test-dtct');
  performBasicTest((typeof document.timeline.getAnimations === 'function'), 'test-dtga');
}
performBasicTest((typeof document.getAnimations === 'function'), 'test-dga');

try {
performBasicTest((typeof window.DocumentTimeline === 'function' && (new DocumentTimeline(0))), 'test-dtc');
} catch(e) {}

function performBasicTest(test, id) {
  if (test) {
    document.getElementById(id).classList.add('passed');
  }
  return test;
}