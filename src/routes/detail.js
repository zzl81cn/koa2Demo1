import md5 from 'md5';
import { query } from '../utils/mysql';
import nunjucks from '../utils/nunjucks';

const detail = async (ctx) => {
  const name = ctx.request.body.name || '';
  const password = md5(ctx.request.body.password || '');
  const sql = 'select * from admin where username = ? and password = ?;';
  const result = await query(sql, [name, password]);
  const { username, realname } = result[0];
  if (username === 'admin' && realname === 'Kenny') {
    ctx.session.realName = realname;
    ctx.response.body = nunjucks.render('detail.njk', { name: realname });
  } else {
    ctx.response.body = '<h1>Login failed!</h1><p><a href="/">Try again</a></p>';
  }
};

module.exports = {
  'POST /detail': detail,
};
