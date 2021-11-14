import { Reveal } from 'react-genie'
import { Animation } from 'react-genie-styled-components'
import styled from 'styled-components'

export const RulesPage: React.VFC = () => {
  return (
    <Rules>
      <h1 aria-label="rules">RULES</h1>
      <Reveal animation={Animation.FadeInUp}>
        <hr />
        {/** 果たしてここにフルーロンを入れてもよいものか */}
        <section>
          <h2>基本的なルール</h2>
          <h3>概要</h3>
          <p>
            Peregreは型の決まったTRPGアプリケーションというよりは、
            アビリティやスキルといったデータを提供するフレームワークに近い存在です。
            進行役はシナリオに合わせてアビリティのみを用い、戦闘システムを独自に定義しても構いませんし、その逆も可能です。
            重要なことは、Peregreが手軽に（そしてランダムに構成された）キャラクターシートを提供する、という部分です。
          </p>
          <h3>進行</h3>
          <p>
            探索パートと戦闘パートが存在し、キャラクターシート上で切り替えることができます。
            探索パートではアビリティを、戦闘パートではスキルを使用します。
            使用の際、進行役に相談したうえで、必ず許可をとってから実行してください。
            なお進行役は許可していないロールを取り消すことができます。
          </p>
          <details>
            <summary>進行役向け</summary>
            <p>
              探索パートで参加者1人ずつにパートを設けるか全員で進めていくかはシナリオに委ねますが、
              戦闘パートは原則として全員が参加できるようにしてください。
            </p>
            <p>
              アビリティについては、後述しますが、仕様上参加者が提案しない限り使用されにくいです。
              Peregreに不慣れな方と参加するときは使用を促してみてください。
            </p>
          </details>
          <h3>神殿、祠</h3>
          <p>
            巡礼者は、同じく呪われた存在から干渉されることで魂魄に傷を追っていきます。
            この傷は神殿や祠でのみ癒すことができ、神殿でゆっくりと休めば全回復しますが、
            忘れさられた小さな祠で祈祷しても少ししか回復しないでしょう。
          </p>
          <p>
            神殿や祠にはもう一つの機能として、スキルの付け替えがあります。
            参加者は進行役が認める限り、パッシブスキルとアクティブスキルを変更できます。
            進行役は、参加者が他の参加者を待たせすぎないよう、制限時間を設けるのが望ましいです。
          </p>
          <p>
            なお以上2つの機能はシナリオが認める他のオブジェクトに適用されるほか、進行役が任意に認めても構いません。
          </p>
          <h3>キャラクターロスト</h3>
          <p>
            個別ロスト、全滅ロスト、ノーロストを採用できます。
          </p>
          <ul>
            <li>個別ロスト：0になった瞬間にロストする。</li>
            <li>
              全滅ロスト：誰か1人が勝利／逃走すれば魂魄量1で皆が生存する。
            </li>
            <li>ノーロスト：最終戦闘で参加者が望まない限りロストしない。</li>
          </ul>
        </section>
      </Reveal>
      <hr />
      <Reveal animation={Animation.FadeInUp}>
        <section>
          <h2>探索</h2>
          <h3>探索とは</h3>
          <p>
            「戦闘パートではないパート」を探索パートとします。
            進行役が情報を提供し、参加者はアクションを示し、
            そのアクションに対して進行役が情報を提供する、といった流れで進められます。
            参加者はアクションの一環としてアビリティの使用を相談することができます。
          </p>
          <h3>アビリティ</h3>
          <p>
            キャラクターが持つ性質、技能、知識を端的に表現したもので、「器用」「絵画」「神学」「野営」など多数存在します。
            入手するアビリティはランダムに決定され、成功率は大抵の場合 60%
            です。
          </p>
          <details>
            <summary>執筆者向け</summary>
            <p>
              多数のアビリティからランダムに抽選されるため、シナリオ進行に必須となるアビリティを設定しないでください。
              これはローグライトにしたい、という他に、吟遊シナリオを防止する意図があります。
              プレイヤーがさまざまなアビリティを所持していることを想定し、
              シナリオ上で障害を設定する際には複数の手段を用意するか、進行役が代替手段を認めやすいものにしてください。
              また難易度が上がったとしても、アビリティが全て失敗／未所持の状態でも「詰み」にならないようにしてください。
            </p>
            <p>
              たとえば進行上必ず特定の鍵が必要になるならば、
              隠密して盗む／誘惑して盗ませる／買い取る／他の魅力的なもので交渉する／戦闘する、などさまざまな手段があるはずで、
              それらを認められるような設計にしてください。
            </p>
          </details>
        </section>
      </Reveal>
      <hr />
      <Reveal animation={Animation.FadeInUp}>
        <section>
          <h2>戦闘</h2>
          <h3>勝利条件</h3>
          <p>シナリオが定めるものか、相手の魂魄量を0にすれば勝利。</p>
          <h3>敗北</h3>
          <p>
            逃走するか全滅すると敗北。敗北時の扱いはシナリオと進行役による。
          </p>
          <h3>戦闘の舞台</h3>
          <p>
            左から 1~4
            の間合いが存在し、戦闘開始時、原則として巡礼者は1~2、エネミーは3~4
            のどこかに配置されます。
            配置の開示は原則としてエネミーからですが、奇襲を受けたときに巡礼者の配置後にエネミーが間合い
            1 に配置されるかもしれません。
          </p>
          <h3>戦闘の流れ</h3>
          <p>
            巡礼者とエネミーが交互にアクションします。巡礼者同士の行動順は参加者が相談して決定します。
            アクションは移動またはスキル使用のいずれかを選択します。
          </p>
          <h3>深度</h3>
          <p>
            戦闘開始時に 1 存在し、スキルの使用宣言時に増減します（最大 4）。
            原則として通常スキルで増加し Ult
            スキルで消費しますが、例外もあります。
          </p>
          <ul>
            <li>Ult　　　：自身の深度を4消費して強力な効果を発揮します。</li>
            <li>深度　　　：自身の深度を値分増減させます。</li>
          </ul>
          <h3>スキルの副作用</h3>
          <p>
            スキルの中には、効果発生時に副作用をもたらすものがあります。これらの効果をすべて覚える必要はなく、必要なときに参照してください。
          </p>
          <ul>
            <li>AoE　　　：対象の間合いにいる全員に命中します。</li>
            <li>貫通　　　：射程内の間合い1人1人に命中します。</li>
            <li>キャスト　：相手側のアクション後に効果が発生します。</li>
            <li>ワープ　　：あらゆる障害を無視してワープします。</li>
          </ul>
          <h3>ステート</h3>
          <p>
            バフやデバフの一覧です。効果を受けた者の次のアクションまで持続します。
          </p>
          <ul>
            <li>スネア　　：移動を封じます。</li>
            <li>挑発　　　：攻撃射程にいる限り使用者が狙われます。</li>
            <li>妨害耐性　：[常時]デバフを防いでいれば効果が終了します。</li>
            <li>攻撃力減少：与えるダメージを 4 減少させます。</li>
            <li>防御力上昇：受けるダメージを 4 軽減します。</li>
            <li>回避　　　：受けるダメージを最初の1回だけ無効化します。</li>
            <li>ステルス　：単体攻撃の対象にならなくなります。</li>
          </ul>
          <hr />
          <h3>詳細なルール</h3>
          <p>戦闘の詳細なルールです。裁定に困った際に参照してください。</p>
          <ol>
            <li>
              戦闘パートでアビリティを使用できますか
              <p>進行役が決定します。</p>
            </li>
            <li>
              アクションを放棄できますか
              <p>可能です。その場合でもステートは破棄されます。</p>
            </li>
            <li>
              スキルの対象が取れませんが、使用を宣言できますか
              <p>戦闘バランス上、できません。</p>
            </li>
            <li>
              同時行動でエネミーに過剰なダメージを与えることはできますか
              <p>可能です。スキルは不発せず副作用も発生します。</p>
            </li>
            <li>
              同じ間合いに複数人いるとき、貫通スキルの対象は誰が選びますか
              <p>他のスキルと同様に行為者が選びます。</p>
            </li>
            <li>
              攻撃を庇うことはできますか
              <p>できません。挑発のみが可能です。</p>
            </li>
            <li>
              相手側のキャストを把握して行動を変化させても構いませんか
              <p>可能です。愚鈍なエネミー以外は。</p>
            </li>
            <li>
              キャストスキルの対象がいなくなりました
              <p>不発します。</p>
            </li>
            <li>
              バフやデバフは重複しますか
              <p>違う名前であれば可能です</p>
            </li>
            <li>
              スネア中にスキル効果で移動できますか
              <p>できません。</p>
            </li>
            <li>
              スネア中にスキル効果でワープできますか
              <p>ワープ後もスネアのままですが可能です。</p>
            </li>
            <li>
              スネア中に回避できますか
              <p>
                できませんが、スネアが攻撃で付与される限りスネアの付与自体を回避することはできます。
              </p>
            </li>
            <li>
              挑発で受ける攻撃を選択できますか
              <p>できません。</p>
            </li>
            <li>
              味方の挑発者と同じ間合いにいるとき庇えますか
              <p>
                代理挑発宣言とみなし、すべての攻撃を受けます。貫通攻撃は両方が受けます。
              </p>
            </li>
            <li>
              挑発者が複数いますが、攻撃を振り分けることができますか
              <p>挑発者ではなく攻撃側が振り分けます。</p>
            </li>
            <li>
              威力が負の値になりました
              <p>下限は0とします。</p>
            </li>
            <li>
              妨害耐性のある状態で複数のデバフを受けました
              <p>
                ステートは自身のアクションまで維持されるため、すべて防止します。
              </p>
            </li>
            <li>
              なんらかの理由で自身のアクションがスキップされました
              <p>ステートは本来アクションがあるタイミングで消失します。</p>
            </li>
            <li>
              複数回行動のときステートはどうなりますか
              <p>
                複数回行動は「1アクションで複数回の選択を行う」という効果なので、ステートは行動のすべてに適用されます。
              </p>
            </li>
            <li>
              2*3 の攻撃に攻撃力上昇が乗るとどうなりますか
              <p>
                6*3
                になります。攻撃力上昇は原則誰にも持たせるべきではなく、「攻撃回数+1」や「威力+3」などで対応する方が望ましいです。
              </p>
            </li>
            <li>
              防御力が上昇していて威力を0に抑えられるとき、回避は消費しますか
              <p>攻撃を受ける側が選択できます。</p>
            </li>
            <li>
              防御力が上昇していて威力を0に抑えられるとき、デバフは受けますか
              <p>受けます。</p>
            </li>
            <li>
              回避がある状態でスネアを受けますか
              <p>スネアが相手の攻撃によるものである限り受けません。</p>
            </li>
            <li>
              ステルス状態の味方を対象に取れますか
              <p>「味方全員に」やAoEでない限り不可能です。</p>
            </li>
            <li>
              他に誰も間合いにいなくともステルス状態の敵にスキルを放てますか
              <p>AoEであれば可能です。</p>
            </li>
            <li>
              ステルス状態の敵が貫通スキルの斜線上にいましたが命中しますか
              <p>AoEでない限り命中しません。</p>
            </li>
            <li>
              ステルス状態でワープしました
              <p>
                ワープ直前に解除され、ワープ後に再びステルス状態になります。
                つまり、進行役や参加者はメタ的には常にキャラクターの位置を把握できていなければなりません。
              </p>
            </li>
          </ol>
        </section>
      </Reveal>
    </Rules>
  )
}

const Rules = styled.article`
  margin-bottom: 9em;
  
  &::before {
    content: '';
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    background-image: url('https://picsum.photos/1200/1200');
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
    width: 100%;
    height: 100vh;
    filter: opacity(0.1) grayscale(0.1) blur(4px) sepia(1);
  }
`
