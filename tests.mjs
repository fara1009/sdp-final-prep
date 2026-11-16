import test from 'node:test';
import assert from 'node:assert/strict';
import {DATA} from './dist/data.js';
import {CORE,createSession,examQuestions,scoreSession,remainingSeconds} from './dist/engine.js';

test('complete, valid study bank',()=>{
  assert.equal(DATA.lectures.length,5);
  assert.equal(DATA.questions.length,214);
  assert.equal(new Set(DATA.questions.map(q=>q.id)).size,214);
  for(const s of DATA.sets) assert.equal(DATA.questions.filter(q=>q.set===s.id).length,40);
  for(const q of DATA.questions){
    assert.equal(q.options.length,4,q.id);
    assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4,q.id);
    assert.ok(q.explanation&&q.prompt&&q.source,q.id);
    assert.equal(new Set(q.options).size,4,q.id);
  }
});
test('exam has 30 unique questions, six per core pattern',()=>{
  const questions=examQuestions(DATA.questions);
  assert.equal(questions.length,30);
  assert.equal(new Set(questions.map(q=>q.id)).size,30);
  for(const topic of CORE)assert.equal(questions.filter(q=>q.topic===topic).length,6);
});
test('option shuffling preserves every correct answer',()=>{
  const session=createSession(DATA.questions,'Test');
  for(const q of session.questions){
    const original=DATA.questions.find(x=>x.id===q.id);
    assert.equal(q.options[q.answer],original.options[original.answer],q.id);
  }
});
test('scoring counts correct, wrong, and unanswered once',()=>{
  const s=createSession(DATA.questions.slice(0,3),'Test');
  s.answers[s.questions[0].id]=s.questions[0].answer;
  s.answers[s.questions[1].id]=(s.questions[1].answer+1)%4;
  assert.deepEqual(scoreSession(s),{correct:1,answered:2,total:3,unanswered:1,percent:33,points:'26.7'});
});
test('deadline is absolute and survives serialization',()=>{
  const s=createSession(DATA.questions.slice(0,30),'Test','exam',1000);
  assert.equal(s.deadline,3001000);
  const restored=JSON.parse(JSON.stringify(s));
  assert.equal(remainingSeconds(restored.deadline,61000),2940);
  assert.equal(remainingSeconds(restored.deadline,4000000),0);
  assert.equal(createSession(DATA.questions.slice(0,1),'Practice').deadline,null);
});
test('restored answers keep score after a reload',()=>{
  const s=createSession(examQuestions(DATA.questions),'Final','exam');
  for(const q of s.questions)s.answers[q.id]=q.answer;
  const score=scoreSession(JSON.parse(JSON.stringify(s)));
  assert.equal(score.correct,30);assert.equal(score.points,'80.0');
});
