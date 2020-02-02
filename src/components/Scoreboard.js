import React, { useState, useEffect } from "react";
import BottomRow from "../BottomRow";

function Scoreboard() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  // Stretch Goals
  const [quarter, setQuarter] = useState(1);
  const [isActive, setActive] = useState(false);
  const [time, setTime] = useState(900);

  const formatTime = () => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes.toString()}:${seconds.toString()}`;
  };

  const touchDownAway = e => {
    setAwayScore(awayScore + 7);
  };

  const fieldGoalAway = e => {
    setAwayScore(awayScore + 3);
  };

  const touchDownHome = e => {
    setHomeScore(homeScore + 7);
  };

  const fieldGoalHome = e => {
    setHomeScore(homeScore + 3);
  };

  const reset = e => {
    setHomeScore(0);
    setAwayScore(0);
    setQuarter(1);
    setActive(false);
  };

  useEffect(() => {
    let int = null;
    if (isActive && time > 0) {
      int = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(int);
    } else if (time === 0 && quarter <= 4) {
      console.log("stopped here");
      clearInterval(int);
      setTime(900);
      nextQuarter();
    } else if (
      (time === 0 && quarter === 4) ||
      quarter === "OT" ||
      quarter === "OT2"
    ) {
      clearInterval(int);
      nextQuarter();
      setTime(900);
    }
    return () => clearInterval(int);
  }, [time, isActive]);

  const leader = homeScore > awayScore ? `Home Team Wins` : `Away Team Wins`;

  const nextQuarter = e => {
    // if the quarter is 4, game is over
    // if quarter less than 4, increment by 1
    // if the scores tied, and quarter is 4, go to OT
    if (homeScore === awayScore && quarter === 4) {
      setQuarter("OT");
      setTime(900);
    } else if (quarter === 4) {
      alert(`Game is over and ${leader}`);
      reset();
      setTime(900);
      setActive(false);
    } else if (quarter === "OT") {
      setQuarter(quarter + "2");
      setTime(900);
    } else if (quarter === "OT2") {
      if (homeScore === awayScore) {
        alert("Game is over in a Tie");
        reset();
        setActive(false);
        setTime(900);
      } else {
        alert(`The winner is ${leader}`);
        reset();
        setActive(false);
        setTime(900);
      }
    } else {
      setQuarter(quarter + 1);
      setTime(900);
    }
  };

  return (
    <div className="container">
      <section className="scoreboard">
        <h1>Welcome To Lambda Stadium</h1>
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Browns</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{homeScore}</div>
          </div>
          <div onClick={() => setActive(!isActive)} className="timer">
            {formatTime()}
          </div>
          <div className="away">
            <h2 className="away__name">Patriots</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRow nextQuarter={nextQuarter} quarter={quarter} />
      </section>
      <h1 class="startGame">
        {!isActive ? "Click The Timer To Start The Clock" : ""}
      </h1>
      <section className="buttons">
        {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}

        <button onClick={touchDownHome} className="homeButtons__touchdown">
          Home Touchdown
        </button>
        <button onClick={fieldGoalHome} className="homeButtons__fieldGoal">
          Home Field Goal
        </button>
        <button onClick={touchDownAway} className="awayButtons__touchdown">
          Away Touchdown
        </button>
        <button onClick={fieldGoalAway} className="awayButtons__fieldGoal">
          Away Field Goal
        </button>

        <div class="controlButtons" />
      </section>
    </div>
  );
}

export default Scoreboard;
